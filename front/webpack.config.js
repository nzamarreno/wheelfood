const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")

const config = {
    context: path.resolve(__dirname, "./"),
    entry: ["./src/index.tsx", "./src/assets/less/main.less"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./bundle.js",
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.less/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    //postcss load postcss.config.js
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: process.env ? false : true,
                                url: false //disable module path for background (publicPath is important)
                            }
                        },
                        {
                            loader: "postcss-loader"
                            //Configuration file postconfig.js
                        },
                        {
                            loader: "less-loader",
                            options: {
                                paths: [path.resolve(path.join(__dirname, "src"))]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                include: /node_modules/,
                loader: "file-loader",
                options: {
                    name: "dist/assets/fonts/[name].[ext]",
                    publicPath: ""
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                loaders: ["ts-loader"],
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".less", ".ts", ".tsx"],
        modules: [path.resolve("./node_modules")]
    },
    plugins: [new ExtractTextPlugin("style.css")]
}

module.exports = config

module.exports = env => {
    if (env.prod) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                }
            })
        )
    }
    if (env.dev) {
        config.devServer = {
            contentBase: path.resolve(__dirname, "dist"),
            https: false,
            open: false,
            port: 3000
        }
    }
    //TIPS on Windows : Launch `php -S 0.0.0.0:1112 -t dist`
    return config
}
