module.exports = {
	entry: './src/app.ts',
	target: 'web',
	mode: 'none',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		extensions: ['.ts'],
	},
	module: {
		rules: [
			{
				use: 'ts-loader',
				test: /\.ts?$/
			}
		],
	}
};
