'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('default', (done) => {
  runSequence(
    'pattern-library',
    'watch',
    done
  )
})
