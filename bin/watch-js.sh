#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )

cd $DIR/..

BASEDIR=`pwd`

PLUGIN_DIRS='lib/vm/plugins lib/plugins'
PLUGINS=""


for PLUGIN_DIR in $PLUGIN_DIRS
do
    PLUGINS_IN_DIR=`ls -1 $PLUGIN_DIR`
    for PLUGIN in $PLUGINS_IN_DIR
    do
        if [ -f $PLUGIN_DIR/$PLUGIN/index.js ]
        then
            PLUGINS="$PLUGINS $PLUGIN_DIR/$PLUGIN/index.js"
        fi
    done
done

./node_modules/.bin/watchify -d client/app.js build/config.js lib/vm/index.js $PLUGINS -o build/system.js