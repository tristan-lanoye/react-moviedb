var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var path = require('path')

var isProd = process.env.NODE_ENV === 'production'
var cssDev = ['style-loader', 'css-loader', 'sass-loader']
var cssProd = ExtractTextPlugin.extract({
    use: (['css-loader', 'sass-loader']),
    fallback: 'style-loader',
    publicPath: '/docs'
})
var cssConfig = isProd ? cssProd : cssDev

module.exports = {
    entry: {
        'app': './src/app.jsx',
        'vendor': './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.s?css$/,
                use: cssConfig
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    // 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            libcss: path.resolve(__dirname, './src/lib/css'),
            libjs: path.resolve(__dirname, './src/lib/js')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        compress: true,
        hot: true,
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles/[name].bundle.css',
            disable: !isProd,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'Project',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/templates/index.ejs'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new UglifyJsPlugin()
    ]
}