#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )

cd $DIR/..

BASEDIR=`pwd`

./node_modules/.bin/browserify -d client/app.js build/config.js build/plugins.js lib/vm/index.js -o build/system.js