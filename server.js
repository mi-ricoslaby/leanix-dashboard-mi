var express = require('express');
var livereload = require('express-livereload');
var serveStatic = require('serve-static');

var port = process.env.PORT || 3000;
var app = express();

livereload(app, config={});

app.use(serveStatic(__dirname + '/public/')).listen(port);

console.log('Serving content of /public on port ' + port);
