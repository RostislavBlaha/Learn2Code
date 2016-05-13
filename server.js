var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxyServer()
var app = express()
var dataFile = path.join(__dirname, 'data.json')

var isProduction = process.env.NODE_ENV === 'production'
var port = isProduction ? process.env.PORT : 3000
var publicPath = path.resolve(__dirname, '.')

app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (!isProduction) {
  var bundle = require('./server/bundle.js')
  bundle()
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    })
  })

}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...')
})


app.listen(port, function () {
    
    
   app.get('/api/data', function(req, res) {
      fs.readFile(dataFile, function(err, data) {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        res.send(JSON.parse(data))
      })
  })
  
  app.post('/api/data', function (req, res) {
    var data = JSON.stringify(req.body)
    fs.writeFile(dataFile, data, function (err,data) {
      if (err) {return console.log(err)}
    })  
  })
  
  app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
    console.log("put")
  })
  
  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
    console.log("delete")
  })

  console.log('Listening at localhost:3000')
  console.log(dataFile)
})
    


