#!/usr/bin/env node
var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic(__dirname + '/../www'));
app.use('/js', serveStatic(__dirname + '/../build'));
app.use('/bootstrap', serveStatic(__dirname + '/../node_modules/bootstrap/dist'));
app.use('/jquery', serveStatic(__dirname + '/../node_modules/jquery/dist'));

//create node.js http server and listen on port
app.listen(3001);
