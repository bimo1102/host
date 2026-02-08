// webpack/webpack.prod.js
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/chunks/[name].[contenthash:8].js',
        clean: true,
    },

    optimization: {
        minimize: true,
        minimizer: ['...', new CssMinimizerWebpackPlugin()],
        splitChunks: {
            chunks: 'all',
            filename: 'js/chunks/[name].[contenthash:8].js',
        },
    },

    plugins: [
        new DotEnvWebpackPlugin({ path: path.resolve(__dirname, './.env.production') }),

        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './../fc-aiot-fe-share/plugins/'),
                    to: 'assets/plugins/',
                    filter: (p) => !p.includes('keenicons'),
                },
                {
                    from: path.resolve(__dirname, './public/media'),
                    to: 'media',
                },
            ],
        }),

        new GenerateSW({
            swDest: 'sw.js',
            skipWaiting: true,
            clientsClaim: true,
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            url: true,
                            sourceMap: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
});
