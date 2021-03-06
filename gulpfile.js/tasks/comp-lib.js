'use strict'

const exec = require('child_process').exec
const gulp = require('gulp')
const runSequence = require('run-sequence')

runSequence.options.showErrorStackTrace = false

gulp.task('kss', (done) => {
  const genCompLib = './node_modules/.bin/kss-node --config component-lib.json'
  exec(genCompLib, (err) => {
    done(err)
  })
})

gulp.task('component-library', (done) => {
  runSequence(
    'build:v3',
    'kss',
    'copy:component-library',
    done
  )
})
