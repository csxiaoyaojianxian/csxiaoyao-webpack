// webpack.single.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

process.env.NODE_ENV = 'production';

module.exports = {
    entry: __dirname + '/app/main.js',
    output: {
        path: path.resolve(__dirname,'build'),
        filename: '[name]-[hash:8].js',
        chunkFilename: 'chunk.[name].js'
    },
    devtool: 'none',
    devServer: {
        contentBase: path.resolve(__dirname,'build'), //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules|bootstrap/,
                loader: 'style-loader!css-loader?minimize&modules!resolve-url-loader!postcss-loader'
                // loader: ExtractTextPlugin.extract('style-loader','css-loader?minimize&modules!resolve-url-loader!postcss-loader')
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader?sourceMap'
            },
            {
                test: /\.css$/,
                include: /bootstrap|mint-ui/,
                loader: 'style-loader!css-loader'
            },
            {
                // 忽略bootstrap自带的字体文件
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                include: /glyphicons/,
                loader: 'null-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=20480&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(tpl|ejs)$/,
                loader: 'ejs'
            },
            {
                test: require.resolve("jquery"),
                exclude: /(node_modules|bower_components)/,
                loader: "expose?$!expose?jQuery"
            }
        ]
    },
    plugins: [
        // 去除 react 压缩报错
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        new webpack.BannerPlugin('By CS逍遥剑仙, www.csxiaoyao.com, QQ:1724338257'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'app/index.tmpl.html')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                // 变量 '$super', '$', 'exports' or 'require'，不会被混淆
                except: ['$super', '$', 'exports', 'require']
            },
            compress: {
                warnings: false
            }
        }),
        // new ExtractTextPlugin('css/[name].css?[contenthash]', { allChunks: true })
    ]
};