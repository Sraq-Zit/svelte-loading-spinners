import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss';

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: 'src/index.ts',
	output: [
		{ 
			file: pkg.module, 
			format: "es",
		},
		{ 
			file: pkg.main, 
			format: "umd",
			name,
		}
	],
	plugins: [
    commonjs(),
    typescript(),
      svelte({
        preprocess: sveltePreprocess(),
      }),
		resolve(),
		postcss({extract: true, extract: "bundle.css", sourceMap: "inline", minimize: false, plugins: [require('autoprefixer')]}),
	]
};
