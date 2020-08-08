var gulp = require("gulp");
var ts = require("gulp-typescript");
var rimraf = require("gulp-rimraf");
var tslint = require("gulp-tslint");
var watch = require("gulp-watch");
var nodemon = require("gulp-nodemon");
var sourcemaps = require("gulp-sourcemaps");
var runSequence = require("run-sequence");
var path = require("path");
var _ = require("lodash");


// Config of gulp plugins
runSequence.options.showErrorStackTrace = false;

gulp.task("compile", function() {
    let project = ts.createProject("./tsconfig.json", { rootDir: "src" });

    return project.src()
        .pipe(sourcemaps.init())
        .pipe(project())
        .js
        .pipe(sourcemaps.mapSources(function(sourcePath, file) {
            let n = _(file.history[0])
                .slice(file.base.length + 1)
                .filter(x => x === "/")
                .value()
       