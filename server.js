var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var httpProxy = require('http-proxy')
var Xray = require('x-ray')

var parser = Xray()
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

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1)
      i--
    }
  }
  return this
}

function parseWebsite(callback, url){
    parser(url, {   title: 'title',
                    iconsRel: ['link@rel'],
                    iconsHref: ['link@href'],
                    images: ['img@src']
                    })
    (function(err, parsedData) {
        if (err) {
          console.error(err)
          callback(null)
        } else{
        var website = { title: parsedData.title,
                        favicon: parsedData.iconsHref[parsedData.iconsRel.indexOf('shortcut icon')],
                        iphoneFavicon: parsedData.iconsHref[parsedData.iconsRel.indexOf('apple-touch-icon')],
                        androidFavicon: parsedData.iconsHref[parsedData.iconsRel.indexOf('icon')],
                        images: parsedData.images.clean("")
                      }
        callback(website)
        }
    })    
}



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
   
   
   app.get('/api/images', function(req, res) {
       console.log(req.query)
        parseWebsite(function(site){
            console.log(site)
            res.send(site)
        }, req.query.url)
  }) 
  
  app.post('/api/data', function (req, res) {
    var data = JSON.stringify(req.body)
    fs.writeFile(dataFile, data, function (err,data) {
      if (err) {return console.log(err)}
    })  
  })
  
  app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
  })
  
  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })

  console.log('Listening at localhost:3000')
})
    


