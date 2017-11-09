'use strict'

var del = require('del')
var path = require('path')
var gulp = require('gulp')
var exec = require('child_process').exec
var runSequence = require('run-sequence')
var config = require('../config')
var compLibConfig = require('../../component-lib.json')

gulp.task('clean-component-library', function (cb) {
  del(compLibConfig.destination, cb)
})

gulp.task('build-component-library', function (cb) {
  var env = global.runmode
  var genCompLib = './node_modules/.bin/kss-node --config component-lib.json'

  exec(genCompLib, function (err, stout, sterr) {
    var files = [
      config.images[env].dest + '/**/*',
      config.sass[env].dest + '**/*',
      config.scripts[env].dest + '/**/*'
    ]

    gulp.src(files, { base: config[env].dest })
        .pipe(gulp.dest(path.join(compLibConfig.destination, 'public')))

    cb(err)
  })
})

gulp.task('component-library', function (cb) {
  runSequence(
    ['clean-component-library', 'sass', 'images', 'browserify'],
    'build-component-library',
    'server:component-library',
    'watch:component-library'
  )
})
