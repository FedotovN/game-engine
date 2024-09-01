import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { resolve, dirname } from 'node:path';
import url from "node:url";

const __dirname = dirname(url.fileURLToPath(import.meta.url));
function getPluginsArray() {
    return [
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
}
export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.cjs.js',
                format: 'cjs',
                sourcemap: true
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: getPluginsArray(),
    }
    ]
