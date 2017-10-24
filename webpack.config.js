const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


// plugins
const cleanDist = new CleanWebpackPlugin(['./dist'])
const extractSass = new ExtractTextPlugin({
    filename: "[name]-[hash:6].css",
    disable: process.env.NODE_ENV === "development"
});
const htmlwebpack = new HtmlWebpackPlugin({
    template: './src/index.html'
});

module.exports = {
    entry: {
        'app': path.resolve('src/app.js')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash:6].js',
    },

    module: {
        rules: [{
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: 2192,
                            outputPath: 'imgs/'
                        }
                    },
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.html$/,
                use:'html-loader'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        cleanDist,
        extractSass,
        htmlwebpack,
    ],

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    }
}