'use strict';

const CleanWebpackPlugin   = require('clean-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const webpack              = require('webpack');
const helpers              = require('./helpers');
const StyleLintPlugin 		 = require('stylelint-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev                = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		vendor: './src/vendor.ts',
		polyfills: './src/polyfills.ts',
		main: isDev
			? './src/main.ts'
			: './src/main.aot.ts'
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.s(a|c)ss$/,
				use: [
					'to-string-loader',
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
				include: helpers.root('src')
			}
		]
	},

	plugins: [
		/* Workaround for https://github.com/angular/angular/issues/21560 */
		new FilterWarningsPlugin({
			exclude: /System.import/
		}),

		new MiniCssExtractPlugin({
			filename: isDev
				? '[name].css'
				: '[name].[hash].css',
			chunkFilename: isDev
				? '[id].css'
				: '[id].[hash].css',
		}),
		
		new StyleLintPlugin({
			configFile: '.stylelintrc',
			context: helpers.root('./src'),
			failOnError: false,
			quiet: true,
		}),

		new CleanWebpackPlugin(
			helpers.root('dist'),
			{
				root: helpers.root(),
				verbose: true
			}
		),

		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),

		new webpack.ContextReplacementPlugin(
			/\@angular(\\|\/)core(\\|\/)fesm5/,
			helpers.root('./src'),
			{}
		)
	]
};
