module.exports = {
	entry: "./basic.js",
	output: {
		filename: "basic.compiled.js",
		path: __dirname
	},
	module: {
		loaders: [
			{
				loader: "babel?presets[]=es2015",
				exclude: /(node_modules|bower_components)/,
				test: /(.*).js$/,
			}
		]
	}
}
