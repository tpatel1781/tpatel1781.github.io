const path = require("path"),
	CleanPlugin = require("clean-webpack-plugin"),
	HtmlPlugin = require("html-webpack-plugin"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	WebappPlugin = require("webapp-webpack-plugin");

module.exports = (_env, options) => {
	const isProduction = options.mode.toLowerCase() === "production";

	return {
		devtool: isProduction ? "source-map" : "inline-source-map",
		entry: path.resolve("src/index.js"),
		output: {
			path: path.resolve("dist"),
			filename: "js/[name].[hash].js"
		},
		module: {
			rules: [
				{
					test: /.html$/,
					use: [
						{
							loader: "html-loader",
							options: {
								minimize: true
							}
						}
					]
				},
				{
					test: /.(c|sc|sa)ss$/,
					use: [
						isProduction
							? MiniCssExtractPlugin.loader
							: "style-loader",
						{
							loader: "css-loader",
							options: { minimize: "true" }
						},
						"postcss-loader",
						"sass-loader"
					]
				},
				{
					test: /\.(jpg|jpeg|png|ico)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[hash].[ext]",
								outputPath: "media/"
							}
						},
						{
							loader: "image-webpack-loader",
							options: {
								disable: !isProduction
							}
						}
					]
				},
				{
					test: /\.(svg|eot|ttf|woff|woff2)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[hash].[ext]",
								outputPath: "fonts/"
							}
						}
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "css/bundle.[hash].css"
			}),
			new HtmlPlugin({
				template: "src/index.html"
			}),
			new WebappPlugin({
				logo: "./src/media/favicon.png",
				prefix: "media/favicons/",
				inject: true,
				favicons: {
					background: "#333",
					theme_color: "#333",
					display: "browser",
					icons: {
						android: true,
						appleIcon: true,
						appleStartup: false,
						coast: false,
						favicons: true,
						firefox: true,
						windows: true,
						yandex: true
					}
				}
			}),
			...(isProduction ? [new CleanPlugin("dist")] : [])
		]
	};
};
