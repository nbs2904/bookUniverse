var gulp = require("gulp");
var del = require("del");
var less = require("gulp-less");
var rename = require("gulp-rename");
var cssmin = require("gulp-cssmin");
// Configuration
var files = {
    projectStyles: [
        "src/less/main.less",
    ],
    projectAssets: [
        "src/**.html",
    ],
    vendorAssets: [
        "node_modules/bootstrap/fonts/*",
    ],
};
var targetDirectory = "build/";
// Cleanup
function clean() {
    return del(["build"]);
}
// Assets
function copyProjectAssets() {
    return gulp.src(files.projectAssets)
        .pipe(gulp.dest(targetDirectory + "frontend"));
}
function copyVendorAssets() {
    return gulp.src(files.vendorAssets)
        .pipe(gulp.dest(targetDirectory + "frontend/fonts"))
    ;
}
var copyAssets = gulp.parallel(copyProjectAssets, copyVendorAssets);
// CSS Compilation
function compileCss() {
    return gulp.src(files.projectStyles)
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename("frontend.css"))
        .pipe(gulp.dest(targetDirectory + "frontend/assets"));
}
var codeCompilation = gulp.series(gulp.parallel(compileCss, copyAssets));

// Common task definition
gulp.task("build", gulp.series(clean, codeCompilation));
gulp.task("default", gulp.series("build"));