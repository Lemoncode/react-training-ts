var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = __dirname;

module.exports = {
    context: path.join(basePath, "src"),
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx']
    },

    entry: [
        './app.tsx',
    ],

    output: {
        path: path.join(basePath, "dist"),
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: './dist', //Content base
        inline: true, //Enable watch and live reload
        host: 'localhost',
        port: 8080
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html', //Name of file in ./dist/
          template: 'index.html' //Name of template in ./src
        })
    ]
};
