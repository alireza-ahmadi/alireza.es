gulp = require 'gulp'
util = require 'gulp-util'
minify = require 'gulp-minify-css'
less = require 'gulp-less'
autoprefixer = require 'gulp-autoprefixer'

# Utilities
errorHandler = (error) ->
  util.log (util.colors.red 'ERROR:'),  error.message
  this.emit 'end'
  return

# Compile LESS files
gulp.task 'less', ->
  prefixOptions =
    browsers : 'last 20 versions'

  gulp.src 'static/styles/style.less'
    .pipe less()
    .on 'error', errorHandler
    .pipe autoprefixer prefixOptions
    .pipe minify()
    .pipe gulp.dest 'static/styles'
  return

# Watch changes
gulp.task 'watch', ->
  gulp.watch 'static/styles/**/*.less', ['less']
  return

gulp.task 'build', ['less']
gulp.task 'default', ['build', 'watch']
