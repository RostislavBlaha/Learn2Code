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

Array.prototype.trim = function() {
    var newData = []
    for (let i = 0; i < this.length; i++) {
        newData.push(this[i].replace('http://','').replace('https://','').replace('www.',''))
    } 
    return newData
}

Array.prototype.clean = function(seen) {
    var unique = []
    for (let i = 0; i < this.length; i++) {
        var current = this.trim()[i]
        if (unique.trim().indexOf(current) < 0){ 
            unique.push(this[i])
        }
    } 
    return unique.filter(function(item){
        return /.+\.(png|jpg|ico|gif|jpeg|svg|tiff|webp).*/g.test(item)
    })   
}

function parseWebsite(url){
    return new Promise(function(resolve, reject) {
        try {
            parser(url, {   title: 'title',
                            iconsRel: ['link@rel'],
                            iconsHref: ['link@href'],
                            images: ['img@src']
                            })
            (function(err, parsedData){
                var website = []
                var images = parsedData.images.clean("")
                if (parsedData.iconsHref[parsedData.iconsRel.indexOf('shortcut icon')]){
                    website.push({  type: "preview",
                                    id: website.length+1,
                                    name:   parsedData.title, 
                                    url: url,
                                    description: parsedData.title, 
                                    img: parsedData.iconsHref[parsedData.iconsRel.indexOf('shortcut icon')] })
                        }              
                if (parsedData.iconsHref[parsedData.iconsRel.indexOf('apple-touch-icon')]){
                    website.push({  type: "preview", 
                                    id: website.length+1,
                                    name:   parsedData.title, 
                                    url: url,
                                    description: parsedData.title, 
                                    img: parsedData.iconsHref[parsedData.iconsRel.indexOf('apple-touch-icon')]})
                        }              
                if (parsedData.iconsHref[parsedData.iconsRel.indexOf('icon')]){
                    website.push({  type: "preview", 
                                    id: website.length+1,
                                    name:   parsedData.title, 
                                    url: url,
                                    description: parsedData.title, 
                                    img: parsedData.iconsHref[parsedData.iconsRel.indexOf('icon')]})
                        }
                for (let i = 0; i < (images.length - 1); i++) {
                    website.push({  type: "preview", 
                                    id: website.length+1,
                                    name:   parsedData.title, 
                                    url: url,
                                    description: parsedData.title, 
                                    img: images[i+1]})    
                }
                console.log(website)
                resolve(website)
            })
        } catch(err){
            reject(err)
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
        parseWebsite(req.query.url)
            .then(function(website){
                res.send(website)})
            .catch(function(err) {
                console.log(err)
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
  })
  
  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })

  console.log('Listening at localhost:3000')
})
    


