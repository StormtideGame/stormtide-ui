// @flow

"use strict";

import path from "path";
import gulp from "gulp";

import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import merge from "merge-stream";
import rename from "gulp-rename";
import watch from "gulp-watch";

import babel from "gulp-babel";
import webpack from "webpack-stream";

import postcss from "gulp-postcss";

import BS from "browser-sync";

const browserSync = BS.create();

const build = {};

build.lib = () => {
	return gulp.src("src/**/*.{js,jsx}", { base: "src" })
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("lib"));
};

build.client = (watch) => {
	const config = {
		...require("./webpack.config"),
		watch
	};

	return gulp.src("src/**/*.js", { base: "src" })
		.pipe(plumber())
		.pipe(webpack(config))
		.pipe(gulp.dest("."));
};

build.styles = () => {
	const plugins = [
		require("postcss-sassy-import")(),
		require("postcss-all-unset"),
		require("postcss-custom-properties")({ preserve: true }),
		require("postcss-color-function"),
		require("postcss-nested"),
		require("postcss-calc"),
		require("autoprefixer")(["last 2 versions", "not Explorer < 11", "not ExplorerMobile < 11"])
	];

	if (process.env.NODE_ENV === "production") {
		plugins.push(require("cssnano")({ autoprefixer: false }));
	}

	let stream = gulp.src("src/index.css")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(postcss(plugins))
		.pipe(rename("bundle.css"));

	if (process.env.NODE_ENV !== "production") {
		stream = stream
			.pipe(sourcemaps.write("."));
	}

	let output = "debug";

	if (process.env.NODE_ENV === "production") {
		output = "lib";
	}

	return stream
		.pipe(gulp.dest(output));
};

build.static = () => {
	let stream = gulp.src("src/static/**/*.*")
		.pipe(plumber());

	let output = "debug";

	if (process.env.NODE_ENV === "production") {
		output = "lib";
	}

	return stream
		.pipe(gulp.dest(output));
};

build.watch = () => {
	browserSync.init({
		server: "debug",
		ghostMode: false,
		browser: []
	});

	watch("src/**/*.css", () => {
		return build.styles()
			.pipe(browserSync.stream({
				match: "**/*.css"
			}));
	});

	watch("src/**/*.js", (change) => {
		return build.lib([path.relative(__dirname, change.path)])
			.pipe(browserSync.stream());
	});

	watch("src/static/**/*.js", (change) => {
		return build.static([path.relative(__dirname, change.path)])
			.pipe(browserSync.stream());
	});

	build.client(true);
};

build.default = () => {
	return merge([build.client(), build.lib(), build.styles(), build.static()]);
};

for (const key of Object.keys(build)) {
	gulp.task(key, build[key]);
}