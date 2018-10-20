module.exports = {
	plugins: [
		require("cssnano")({
			preset: [
				"default",
				{
					discardComments: {
						removeAll: true
					}
				}
			]
		}),
		require("postcss-gap-properties"),
		require("autoprefixer")({
			grid: true
		})
	]
};
