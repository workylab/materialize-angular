'use strict';

const webpackMerge 				 = require('webpack-merge');
const commonConfig 				 = require('./webpack.config.common');
const helpers      				 = require('./helpers');

module.exports = webpackMerge(commonConfig, {
	mode: 'development',

	devtool: 'cheap-module-eval-source-map',

	output: {
		path: helpers.root('dist'),
		publicPath: '/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},

	optimization: {
		noEmitOnErrors: true
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
					{
						loader: 'awesome-typescript-loader',
						options: { configFileName: helpers.root('tsconfig.json') }
					},
					{
  					loader: 'eslint-loader',
  					options: { configFileName: '.eslintrc' }
  				},
					'angular2-template-loader',
					'angular-router-loader'
				],
				exclude: [/node_modules/]
			}
		]
	},

	devServer: {
		contentBase: helpers.root('src'),
		stats: {
			hash: false,
			version: false,
			timings: true,
			assets: false,
			chunks: false,
			modules: false,
			reasons: true,
			children: false,
			source: false,
			errors: true,
			errorDetails: false,
			warnings: true,
			publicPath: false
		},
		host: '0.0.0.0',
		inline: true,
		port: 3000,
		open: false,
		disableHostCheck: true,
		historyApiFallback: true
	}
});
