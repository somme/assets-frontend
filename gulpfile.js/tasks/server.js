const gulp = require('gulp')
const browserSync = require('browser-sync')
const config = require('../config').browserSync

gulp.task('server', () => {
  const servers = [
    config.assets,
    config.patternLibrary
  ]

  servers.forEach((server, i) => {
    browserSync.create(`${i}`).init(server)
  })
})

gulp.task('server:component-library', () => {
  browserSync
    .create('component-library')
    .init(config.componentLibrary)
})
