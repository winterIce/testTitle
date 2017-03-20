var webpack = require('webpack');
var path = require('path');
// var fs = require('fs');
// var crypto = require('crypto');

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/app'),
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		// filename: '[name]-[hash:8].js',
        filename: '[name].js',
	},
	module: {
		loaders: [
            {
            	test: /\.jsx?$/,
            	exclude: '/node_modules/',
            	loader: 'babel',
            	query: {
            		presets: ['es2015', 'react']
            	}
            },
            {
            	test: /\.(png|jpg|gif)$/,
            	loader: 'url-loader?limit=8192'
            },
            {
            	test: /\.css$/,
            	loader: 'style!css'
            }
		],
	},
	plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        // }),
        // new webpack.IgnorePlugin(/^(jquery)$/)
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || false))
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     output: {
        //     	comments: false,
        //     },
        //     compress: {
        //     	warnings: false,
        //     }
        // }),
        // function() {
        // 	this.plugin('done', function(stats) {
        // 		//css的md5重命名
        // 		var cssMD5 = '',
        // 		var cssName = '';
        // 		var stream = fs.createReadStream('../css/appLeave/appLeave.css');
        // 		var fsHash = crypto.createHash('md5');
        // 		stream.on('data', function(d) {
        // 			fsHash.update(d);
        // 		});
        // 		stream.on('end', function() {
        // 			var cssMD5 = fsHash.digest('hex');
        // 			cssName = 'appLeave-' + cssMD5.slice(0, 8) + '.css';
        // 			fs.readFile('../css/appLeave/appLeave.css', 'utf-8', function(e, d) {
        // 				if(e) throw e;
        // 				fs.writeFileSync('../css/appLeave' + cssName, d);
        // 			});
        // 		});

        // 		var asset = stats.toJson().assets;
        // 		console.log(asset);
        // 		asset.forEach(function(item) {
        // 			var file = '../appLeave_index_src.tpl';
        // 			var output_file = '../appLeave_index.tpl';
        // 			fs.readFile(file, 'utf-8', function(e, d) {});
        // 			if(e) throw e;
        // 			if(item.chunkNames[0] == 'app') {
        // 				d = d.replace('%app.js%', item.name).replace('%appLeave.css%', cssName);
        // 				fs.writeFileSync(output_file, d);
        // 			}

        // 		});
        // 	});
        // }
	],
	externals: {
		'jquery': 'jQuery', //外部链接
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	resolve: {
		extensions:['', '.js', '.jsx'],//require的时候不用写后缀
		alias: {
			'react': path.resolve(__dirname, 'node_modules/react/dist/react.min'),
			'react-dom': path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.min'),
			'jQuery': path.resolve(__dirname, 'node_modules/jquery/dist/juery.min'),
		}
	}

}