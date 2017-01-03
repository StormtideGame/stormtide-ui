const { readFileSync } = require("fs");
const { webpack } = require("webpack-stream");

const babelConfig = JSON.parse(readFileSync(".babelrc", "utf8"));

let outputDir = "debug";

if (process.env.NODE_ENV === "production") {
	outputDir = "lib";
}

const config = {
	entry: {
		app: "./src/client.js",
		vendor: [
			"babel-polyfill",
			"react", "react-dom"
		]
	},
	output: {
		filename: `${ outputDir }/[name].js`
	},
	resolve: {
		extensions: ["", ".jsx", ".js"]
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel",
				query: babelConfig
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor", `${ outputDir }/vendor.js`)
	]
};

if (process.env.NODE_ENV === "production") {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}));

	config.plugins.push(new webpack.DefinePlugin({
		"process.env": {
			NODE_ENV: `"production"`
		}
	}));
} else {
	config.devtool = "source-map";
}

module.exports = config;