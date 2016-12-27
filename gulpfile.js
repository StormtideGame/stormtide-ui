// @flow

"use strict";

const gulp = require("gulp");

const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("default", () => {
	return gulp.src("src/**/*.js", { base: "src" })
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("lib"));
});