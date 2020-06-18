const gulp = require("gulp");
const util = require("gulp-util");
const cleanCSS = require("gulp-clean-css");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");

// Utilities
const errorHandler = (error) => {
  util.log(util.colors.red, "ERROR:", error.message);
  this.emit("end");
};

// Compile LESS files
gulp.task("less", (done) => {
  const prefixOptions = {
    overrideBrowserslist: "last 20 versions",
  };

  gulp
    .src("styles/style.less")
    .pipe(less())
    .on("error", errorHandler)
    .pipe(autoprefixer(prefixOptions))
    .pipe(cleanCSS())
    .pipe(gulp.dest("static"));
  done();
});

// Watch changes
gulp.task("watch", () => {
  gulp.watch("styles/**/*.less", gulp.series(["less"]));
});

gulp.task("build", gulp.series(["less"]));
gulp.task("default", gulp.series(["build", "watch"]));
