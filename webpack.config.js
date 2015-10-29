var path = require('path');

module.exports = {    
    context: path.resolve('js'),
    entry: ["./utils", "./app"],
    output: {        
        path: path.resolve('build/js/'),
        filename: "bundle.js",
        publicPath: '/public/assets/js/'
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
                loader: "babel-loader"
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
		        }
        ]
    }
}