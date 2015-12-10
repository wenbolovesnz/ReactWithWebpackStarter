var path = require('path');

module.exports = {    
    context: path.resolve('js'),
    entry: ["./configDev", "./app"],
    output: {        
        path: path.resolve('build/'),
        filename: "bundle.js",
        publicPath: '/public/assets/'
    },
    devServer:{
        contentBase: 'public'
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
		        }
        ]
    }
}