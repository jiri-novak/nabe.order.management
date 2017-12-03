var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

// paths determine
const clientAppRoot = helpers.root('ClientApp');
const clientAppSrc = helpers.root('ClientApp', 'app');

module.exports = {
    target: 'web',
    entry: {
        'app': [`./ClientApp/polyfills.ts`, `./ClientApp/main.ts`]
    },

    resolve: {
        extensions: ['*', '.ts', '.js']
    },

    module: {
        exprContextCritical: false,
        rules: [
            // angular2 typescript loader
            {
                test: /\.ts$/,
                include: [clientAppRoot],
                loaders: ['awesome-typescript-loader?doTypeCheck=false&useBabel=true&useWebpackText=true ', 'angular2-template-loader', 'angular-router-loader']
            },
            // html loader
            {
                test: /\.html$/,
                loader: 'raw-loader',
                include: [clientAppRoot]
            },
            // static assets
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
                include: [clientAppRoot],
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            // css loader and inject into components
            {
                test: /\.css$/,
                include: [clientAppSrc],
                loader: ['raw-loader']
            },
            // css global which not include in components
            {
                test: /\.css$/,
                include: [clientAppRoot],
                exclude: [clientAppSrc],
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['raw-loader', 'postcss-loader']
                })
            },
            // SASS loader and inject into components      
            {
                test: /\.scss$/,
                include: [clientAppSrc],
                loaders: ['raw-loader', 'sass-loader']
            },
            // SASS global which not include in components
            {
                test: /\.scss$/,
                include: [clientAppRoot],
                exclude: [clientAppSrc],
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['raw-loader', 'postcss-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [

        new CopyWebpackPlugin([{
            from: `ClientApp/assets/images`,
            to: 'assets/images'
        },
        {
            from: `ClientApp/assets/icons`,
            to: 'assets/icons'
        },
        {
            from: `ClientApp/assets/i18n`,
            to: 'assets/icons'
        },
        {
            from: `ClientApp/assets/fonts`,
            to: 'assets/fonts'
        }]),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),

        // Tslint configuration for webpack 2
        new webpack.LoaderOptionsPlugin({
            options: {
				/**
				 * Apply the tslint loader as pre/postLoader
				 * Reference: https://github.com/wbuchwalter/tslint-loader
				 */
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                },
				/**
				 * Sass
				 * Reference: https://github.com/jtangelder/sass-loader
				 * Transforms .scss files to .css
				 */
                sassLoader: {
                    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
                },
				/**
				 * PostCSS
				 * Reference: https://github.com/postcss/autoprefixer-core
				 * Add vendor prefixes to your css
				 */
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        }),

        // Extract css files
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ]
};