const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function(_env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        mode: isProduction ? "production" : "development",
        devtool: isDevelopment && "cheap-module-source-map",
        entry: path.resolve(__dirname, './src/index.js'),
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name].js",
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            envName: isProduction ? "production" : "development"
                        }
                    }
                },
                {
                    test: /\.(scss|sass|css)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader",
                        "postcss-loader",
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: {
                        loader: "file-loader",
                        options: {
                            limit: 4096,
                            name: '[name].[ext]',
                            outputPath: 'images/',
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"]
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    loader: require.resolve("file-loader"),
                    options: {
                        name: "static/media/[name].[hash:8].[ext]"
                    }
                }
            ]
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        plugins: [
            isProduction &&
            new MiniCssExtractPlugin({
                filename: "assets/css/[name].[contenthash:8].css",
                chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public/index.html"),
                inject: true
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(
                    isProduction ? "production" : "development"
                )
            })
        ].filter(Boolean),
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: {
                        compress: {
                            comparisons: false
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            comments: false,
                            ascii_only: true
                        },
                        warnings: false
                    }
                }),
                new OptimizeCssAssetsPlugin()
            ],
            splitChunks: {
                chunks: "all",
                minSize: 0,
                maxInitialRequests: 10,
                maxAsyncRequests: 10,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module, chunks, cacheGroupKey) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                        }
                    },
                    common: {
                        minChunks: 2,
                        priority: -10
                    }
                }
            },
            runtimeChunk: "single"
        },
        devServer: {
            compress: true,
            historyApiFallback: true,
            open: false,
        }
    };
};