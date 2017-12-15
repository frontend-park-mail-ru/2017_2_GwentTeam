const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SRC_DIR = 'public';
const BUILD_DIR = 'build';

const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'production'
};
const IS_PROD = ENV.NODE_ENV === 'production';

const CSS_LOADER_CONFIG = IS_PROD ? 'css-loader?minimize' : 'css-loader';

let webpackPlugins = [
    new CleanWebpackPlugin([BUILD_DIR]),
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, SRC_DIR, 'index.html'),
    }),
    new ExtractTextPlugin('[name].css'),

    new CopyWebpackPlugin([{
        from: path.join(__dirname, 'public', 'images'),
        to: path.join(__dirname, 'build', 'img')
    }, {
        from: path.join(__dirname, 'public', 'service-worker.js'),
        to: path.join(__dirname, 'build', 'service-worker.js')
    }])
];

if (IS_PROD) {
    webpackPlugins = webpackPlugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                comparisons: false,
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]);
}

const clientConfig = {
    target: 'web',
    entry: {
        client: path.resolve(__dirname, SRC_DIR, 'main.js')
    },
    output: {
        path: path.join(__dirname, BUILD_DIR),
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
            }, {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        CSS_LOADER_CONFIG,
                        'stylus-loader'
                    ],
                }),
            }, {
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
    plugins: webpackPlugins,
};

module.exports = [clientConfig];
