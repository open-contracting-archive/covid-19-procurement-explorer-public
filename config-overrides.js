const tailwindCss = require("tailwindcss");
const WebpackNotifierPlugin = require("webpack-notifier");
const { join } = require("path");

module.exports = function override(config, env) {
	const overridePlugins = [
		...config.plugins,
		new WebpackNotifierPlugin({
			alwaysNotify: true,
			title: "Covid-19 Contract Explorer",
			contentImage: join(__dirname, "public/logo192.png"),
		}),
	];
	const overrideModuleRules = [
		...config.module.rules,
		{
			test: /\.scss$/,

			use: [
				{
					loader: "postcss-loader",
					options: {
						postcssOptions: {
							plugins: [tailwindCss("./tailwind.config.js")],
						},
					},
				},
				{ loader: "sass-loader" },
			],
		},
	];
	return {
		...config,
		plugins: overridePlugins,
		module: { ...config.module, rules: overrideModuleRules },
	};
};
