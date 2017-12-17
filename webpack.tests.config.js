
const {resolve} = require('path');
const {NamedModulesPlugin} = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');


module.exports = {

    devtool: 'source-map',

    context: resolve(__dirname, 'test'),

    entry: './index.ts',

    output: {
        filename: 'agama.http.tests.js',
        path: resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'awesome-typescript-loader'
            }
        ]
    },

    //node: {
    //    process: false
    //},

    plugins: [
        new CheckerPlugin(),
        new NamedModulesPlugin()
    ]

};
