#!/usr/bin/env node
'use strict';

var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');
var open = require('open');

var root = path.resolve(__dirname, '../www');
var port = Number(process.env.PORT || 3001);
var mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8'
};

function resolveRequest(requestUrl) {
    var pathname = decodeURIComponent(url.parse(requestUrl).pathname || '/');
    if (pathname === '/') {
        pathname = '/index.html';
    }
    var candidate = path.resolve(root, '.' + pathname);
    if (candidate !== root && candidate.indexOf(root + path.sep) !== 0) {
        return null;
    }
    return candidate;
}

var server = http.createServer(function(request, response) {
    var filePath = resolveRequest(request.url);
    if (!filePath) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
    }

    fs.stat(filePath, function(error, stat) {
        if (error || !stat.isFile()) {
            response.writeHead(404);
            response.end('Not found');
            return;
        }
        response.writeHead(200, {
            'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream',
            'Cache-Control': 'no-store'
        });
        fs.createReadStream(filePath).pipe(response);
    });
});

server.listen(port, '127.0.0.1', function() {
    const server_url = 'http://127.0.0.1:' + port + '/';
    console.log('Scope.js UI: ' + server_url);
    if (process.argv.includes('--open')) {
        (async () => { await open.default(server_url); })();
    }
});
