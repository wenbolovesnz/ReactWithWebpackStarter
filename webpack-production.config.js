var WebpackStrip = require('strip-loader');
var path = require('path');

module.exports = {
	context: path.resolve('js'),
	entry: ["./configProd", "./app"],
	output: {
		path: path.resolve('public/assets'),
		filename: "bundle.js"
	},
	module:{
		preLoaders:[
			{
				test:/\.js$/,
				exclude: /node_modules/,
				loader: 'jshint-loader'
			}
		],
		loaders:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader?optional=runtime"
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader!autoprefixer-loader"
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader!autoprefixer-loader!less-loader"
			},
			{
				test: /\.(png|jpg)/,
				exclude: /node_modules/,
				loader:"url-loader?limit=1000000"
			},
			{
				test:/\.js$/,
				exclude: /node_modules/,
				loader: WebpackStrip.loader('console.log', 'debug')
			}
		]
	}
};
