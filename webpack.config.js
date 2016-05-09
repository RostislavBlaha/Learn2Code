var path = require('path')
var webpack = require('webpack')
var nodeModulesPath = path.resolve(__dirname, 'node_modules')
var buildPath = path.resolve(__dirname, 'public', 'build')
var mainPath = path.resolve(__dirname, 'src', 'index.js')

module.exports = {
    devtool: 'eval',
    entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    mainPath
  ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: [nodeModulesPath],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
}
