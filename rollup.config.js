import { terser } from "rollup-plugin-terser";

export default {
    input: "src/measure.js",
    output: [
        {file: 'dist/measure.js', format: 'es'}
    ],
    plugins: [
        terser()
    ]
};