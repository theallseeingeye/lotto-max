const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				// https://github.com/webpack-contrib/html-loader
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					minimize: true,
				},
			},
			{
				// Images and fonts (ttf)
				test: /\.(png|svg|jpg|gif|ttf)$/,
				use: [
					'file-loader'
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "./index.html"
		}),
	]
};