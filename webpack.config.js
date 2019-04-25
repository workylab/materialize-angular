'use strict';

const HtmlWebpackPlugin    = require('html-webpack-plugin');
const webpack              = require('webpack');
const helpers              = require('./config/helpers');
const StyleLintPlugin 		 = require('stylelint-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',

	devtool: 'cheap-module-eval-source-map',

	entry: {
		vendor: './src/vendor.ts',
		polyfills: './src/polyfills.ts',
		main: './src/main.ts'
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

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
						options: { configFileName: helpers.root('tsconfig.webpack.json') }
					},
					{
  					loader: 'eslint-loader',
  					options: { configFileName: '.eslintrc' }
  				},
					'angular2-template-loader'
				],
				exclude: [/node_modules/]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.s(a|c)ss$/,
				use: [
					'to-string-loader',
					'style-loader',
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
				include: helpers.root('src')
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}]
			}
		]
	},

	plugins: [
		/* Workaround for https://github.com/angular/angular/issues/21560 */
		new FilterWarningsPlugin({
			exclude: /System.import/
		}),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		
		new StyleLintPlugin({
			configFile: '.stylelintrc',
			context: helpers.root('./src'),
			failOnError: false,
			files: ['/styles/**/*.s?(a|c)ss', '/app/components/**/*.s?(a|c)ss'],
			quiet: true,
		}),

		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),

		new webpack.ContextReplacementPlugin(
			/\@angular(\\|\/)core(\\|\/)fesm5/,
			helpers.root('./src'),
			{}
		)
	],

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
};
