// webpack.dev.js
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-source-map',
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },

    devServer: {
        host: '0.0.0.0',
        port: 4400,
        allowedHosts: 'all',
        hot: false,
        historyApiFallback: { disableDotRule: true, rewrites: [{ from: /^\/.*$/, to: '/index.html' }] },
        static: [
            // { directory: path.resolve(__dirname, './src'), publicPath: '/' },
            {
                directory: path.resolve(__dirname, './../fc-aiot-fe-share/plugins'),
                publicPath: '/assets/plugins',
            },
            // {
            //     directory: path.resolve(__dirname, 'public/media'),
            //     publicPath: '/media',
            // },
            {
                directory: path.resolve(__dirname, 'public'),
                publicPath: '/',
            },
            // path.join(__dirname, 'public'),
        ],
    },
    output: {
        publicPath: 'auto',
        filename: '[name].bundle.js',
        chunkFilename: 'js/chunks/[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        scriptType: 'text/javascript',
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            url: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
});
