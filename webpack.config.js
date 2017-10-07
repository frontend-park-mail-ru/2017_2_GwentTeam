const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const isDev = process.env.NODE_ENV === 'dev';
// const _API_HOST = isDev ? 'http://localhost:3000' : '';
// const _ENV = isDev ? 'develop' : 'production';
//
// const devtool = isDev ? 'cheap-source-map' : 'source-map';
// console.log(devtool);
// console.log();
//
 const SRC_DIR = 'public';
 const BUILD_DIR = 'build';

const clientConfig = {
    target: 'web',
    // devtool,
     entry: {
        // react: ['react', 'react-dom'],
         client: path.resolve(__dirname, SRC_DIR, 'main.js'),
     },
     output: {
         path: path.join(__dirname, BUILD_DIR),
         publicPath: '/',
         filename: '[name].bundle.js',
         //chunkFilename: '[id].chunk.js',
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
                test: /\.(jpe?g|png|gif|svg|)$/i,
                loader: 'file-loader?name=img/[hash].[ext]'
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
            //favicon: path.resolve(__dirname, SRC_DIR, 'favicon.ico'),
            template: path.resolve(__dirname, SRC_DIR, 'index.html'),
        }),
         new ExtractTextPlugin(path.join('css', '[name].css')),
    ],
};

// if (!isDev) {
//     clientConfig.plugins.push(new UglifyJSPlugin());
// }

module.exports = [clientConfig];
