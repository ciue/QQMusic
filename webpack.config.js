const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
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
                        loader:"postcss-loader",
                        options:{
                            plugins:[
                                require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    },{
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
                            limit: 8192,
                            outputPath: 'imgs/'
                        }
                    },
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }

            },
            {
                test: /\.html$/,
                use:'html-loader'
            }
        ]
    },

    plugins: [
        new UglifyJSPlugin(),
        cleanDist,
        extractSass,
        htmlwebpack,
    ],

    // devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        port: 3000
    }
}