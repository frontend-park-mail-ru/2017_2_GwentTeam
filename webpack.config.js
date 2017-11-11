const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SRC_DIR = 'public';
const BUILD_DIR = 'build';

const clientConfig = {
    target: 'web',
    entry: {
        client: path.resolve(__dirname, SRC_DIR, 'main.js'),
    },
    output: {
        path: path.join(__dirname, BUILD_DIR),
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /dist*/],
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                    ]
                }),
            }, {
                test: /\.(jp?g|png|gif|svg|)$/i,
                loader: 'file-loader?name=img/[name].[hash].[ext]'
            }, {
                test: /\.html/,
                loader: 'html-loader',
            }, {
                test: /\.pug/,
                loader: 'pug-loader',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin([BUILD_DIR]),
        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, SRC_DIR, 'index.html'),
        }),
        new ExtractTextPlugin(path.join('css', '[name].css')),

        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'public', 'images'),
            to: path.join(__dirname, 'build', 'img')
        }])
    ],
};

module.exports = [clientConfig];
