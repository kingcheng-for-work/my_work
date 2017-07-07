module.exports = {
	entry: './src/main.js',
	output: {
		path: __dirname,
		filename: 'dist/appBundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
				query:{
					presets: ['es2015', 'react'],
					plugins: ['react-html-attrs']
				}
			},
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.(png|jpg|gif|ttf)$/, loader: 'file-loader'}
		]
	}
	
}