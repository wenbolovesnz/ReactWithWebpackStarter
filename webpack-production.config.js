var WebpackStrip = require('strip-loader');
var devConfig = require('./webpack.config.js');

var stripLoader = {
	test:/\.js$/,
	exclude: /node_modules/,	
	loader: WebpackStrip.loader('console.log', 'debug')
};
console.log(devConfig.module.loaders);

devConfig.module.loaders.push(stripLoader);

console.log(devConfig.module.loaders);

module.exports = devConfig;


