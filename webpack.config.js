'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

function join(dest) { return path.resolve(__dirname, dest); }
function web(dest) { return join('web/static/' + dest ); }

var config = module.exports = {
    entry: {
        application: [
            web('css/app.sass'),
            web('js/app.js')
        ],
    },

    output: {
        path: join('priv/static'),
        filename: 'js/app.js',
    },

    resolve: {
        extensions: ['', '.js', '.sass'],
        modulesDirectories: ['node_modules'],
        alias: {
            phoenix_html: __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
            phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js"
        },
    },

    module: {
        noParse: /vendor\/phoenix/,
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    plugins: ['transform-decorators-legacy'],
                    presets: ['react', 'es2015', 'stage-2', 'stage-0'],
                },
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'),
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ],
    },

    plugins: [
        new ExtractTextPlugin('css/app.css'),
    ],
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    );
}
