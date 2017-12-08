const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./build",
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules|bootstrap/,
                loader: 'style-loader!css-loader?modules!resolve-url-loader!postcss-loader'
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
                exclude: /node_modules/,
                loader: "expose?$!expose?jQuery"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin()// 热加载插件
    ]
};