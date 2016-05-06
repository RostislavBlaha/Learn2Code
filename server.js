var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var express = require('express')
var app = express()

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err)
  }
    
  app.get('/', function(req, res) {
      res.send('hello world')
  })
  
  app.post('/', function (req, res) {
    res.send('Got a POST request')
  })
  
  app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
  })
  
  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })

  console.log('Listening at localhost:3000')
})
