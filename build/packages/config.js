import path from 'path'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import flow from 'rollup-plugin-flow-no-whitespace'
import cjs from 'rollup-plugin-commonjs'
import node from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import svgo from 'rollup-plugin-svgo'
import buble from 'rollup-plugin-buble'

const resolve = _path => path.resolve(__dirname, '../../', _path)

function genConfig(opts) {
    
    
    const pkg = require(opts.package)
    
    const banner = `
    /*!
    * ${opts.name} v${pkg.version}
    * (c) ${new Date().getFullYear()} HollyIT (limited liability)
    * @license MIT
    */
  `
    
    const config = {
        input: {
            input: opts.input,
            plugins: [
                svgo(),
                flow(),
                node(),
                cjs(),
                vue({
                    css: true,
                    compileTemplate: true,
                }),
                replace({
                    __VERSION__: pkg.version,
                }),
                babel({
                    exclude: 'node_modules/**',
                }),
            ],
            external(id) {
                id = id.replace(/\\/g, '/')
                if (id.indexOf('vue-runtime-helpers') > -1) {
                    return false;
                }
                return !(/^[\.\/]/.test(id) || id.indexOf('packages/' + opts.name) > 1 ||
                    id.indexOf('?rollup-plugin') > 1)
                || id.indexOf('vue-runtime-helpers') > -1
            },
        },
        output: {
            file: opts.file,
            format: opts.format,
            banner,
            name: opts.outputName,
        },
    }
    
    if (opts.env) {
        config.input.plugins.unshift(replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
        }))
    }
    
    return config
}

export default [
 
   {
       package: 'structured-editor',
       outputName: 'structuredEditor',
       outputFileName: 'editor',
   },

   {
       package: 'structured-editor-utils',
       outputName: 'structuredEditorUtils',
       outputFileName: 'utils',
   },

    {
        package: 'structured-editor-extensions',
        outputName: 'structuredEditorExtensions',
        outputFileName: 'extensions',
    },
 
    {
        package: 'structured-editor-ui',
        outputName: 'structuredEditorUI',
        outputFileName: 'ui',
    },
    
    
    {
        package: 'structured-editor-tables',
        outputName: 'structuredEditorTables',
        outputFileName: 'tables',
    },

].map(item => [
        {
            name: item.package,
            outputName: item.outputName,
            package: resolve(`packages/${item.package}/package.json`),
            input: resolve(`packages/${item.package}/src/index.js`),
            file: resolve(
                `packages/${item.package}/dist/${item.outputFileName}.js`),
            format: 'umd',
            env: 'development',
        },
        {
            name: item.package,
            outputName: item.outputName,
            package: resolve(`packages/${item.package}/package.json`),
            input: resolve(`packages/${item.package}/src/index.js`),
            file: resolve(
                `packages/${item.package}/dist/${item.outputFileName}.min.js`),
            format: 'umd',
            env: 'production',
        },
        {
            name: item.package,
            outputName: item.outputName,
            package: resolve(`packages/${item.package}/package.json`),
            input: resolve(`packages/${item.package}/src/index.js`),
            file: resolve(
                `packages/${item.package}/dist/${item.outputFileName}.common.js`),
            format: 'cjs',
        },
        {
            name: item.package,
            outputName: item.outputName,
            package: resolve(`packages/${item.package}/package.json`),
            input: resolve(`packages/${item.package}/src/index.js`),
            file: resolve(
                `packages/${item.package}/dist/${item.outputFileName}.esm.js`),
            format: 'es',
        }])
    .reduce((allConfigs, configs) => ([
        ...allConfigs,
        ...configs,
    ]), [])
    .map(genConfig)
