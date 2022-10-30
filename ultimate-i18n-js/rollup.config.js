import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

function config(outputFile, plugins) {
	return 	{
		input: './src/index.ts',
		output: {
			name: 'UltimateI18n',
			file: outputFile,
			format: 'umd',
		},
		plugins: [
			typescript({
				useTsconfigDeclarationDir: true
			}),
			...plugins
		]
	};
}

export default [
	config('lib/index.js', []),
	config('lib/index.min.js', [terser()])
];
