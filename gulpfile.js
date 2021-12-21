const gulp = require("gulp");
const run = require("gulp-run-command").default;

const eslint = require("gulp-eslint");
const mocha = require("gulp-mocha");

gulp.task("lint", () => {
    return gulp.src(["**/*.js", "**/*.ts", "!**/node_modules/**", "!**/cypress/**"])
        .pipe(eslint({ configFile: "./.eslintrc.json", fix: true }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("unit-tests", async () => {
    gulp.src(["./test/subModel.controller.test.js", "./test/paymentMethod.controller.test.js"])
        .pipe(mocha({ reporter: "list", exit: true }));
});

gulp.task("e2e", async () => {
    await run("npm run e2e")();
});

gulp.task("build", run("ng build --configuration=production"));

gulp.task("start", run("npm run backend", {
    env: { NODE_ENV: "production" }
}));

gulp.task("default", gulp.series("lint", "unit-tests", "e2e", "build", "start"));