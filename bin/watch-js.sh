#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )

cd $DIR/..

BASEDIR=`pwd`

./node_modules/.bin/watchify -v -d client/app.js -o build/system.js