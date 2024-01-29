const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        // index: './src/index.js',
        // print: './src/print.js',
        ragul: './src/ragul.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: './dist',
    },
    // plugins:  [
    //   new   HtmlWebpackPlugin(
    //     {

    //       title:'dev',
    //       inject:'body',
    //     }
    //   )
    // ],

    optimization: {
        runtimeChunk: 'single',
    },
}
