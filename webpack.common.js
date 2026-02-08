//webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');
const ExternalRemotesPlugin = require('external-remotes-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const WebpackShared = require('./../fc-aiot-fe-share/tools/webpack.share');
const federationConfig = require('./federation.config');
module.exports = {
    name: 'host',

    entry: './src/index.tsx',

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@fc-aiot-fe-share': path.resolve(__dirname, './../fc-aiot-fe-share'),
            '@': path.resolve(__dirname, './src'),
        },
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'public')],
    },

    plugins: [
        new HtmlWebpackPlugin({ title: 'FaCare', template: 'src/index.html' }),

        new DotEnvWebpackPlugin({
            allowEmptyValues: true,
            prefix: 'process.env.',
            path: path.resolve(__dirname, './.env.development'), // overridden by dev/prod configs
        }),

        new container.ModuleFederationPlugin({
            name: federationConfig.moduleName,
            filename: 'remoteEntry.js',
            remotes: federationConfig.remotes,
            exposes: federationConfig.exposes,
            shared: WebpackShared.CommonSharedLibrary({ eager: true }),
        }),

        new ExternalRemotesPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.(tsx|ts|jsx|js|mjs)$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-typescript'],
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
                exclude: [/node_modules/, path.resolve(__dirname, './../fc-aiot-fe-share/external-libs')],
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]',
                },
            },
        ],
    },
};
