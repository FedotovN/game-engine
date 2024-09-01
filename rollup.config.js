import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { resolve, dirname } from 'node:path';
import { createRequire } from "module";
import url from "node:url";

const __dirname = dirname(url.fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

console.log(typeof typescriptPaths);
export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/bundle.esm.js',
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        alias({
            entries: [
                { find: '@', replacement: resolve(__dirname, 'src') }
            ]
        }),
        typescript({
            tsconfig: "./tsconfig.json",
            useTsconfigDeclarationDir: true,
            clean: true,
        })
    ]
};
