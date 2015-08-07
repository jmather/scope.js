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
            if [ ! -d $BASEDIR/node_modules/scope-plugin-$PLUGIN ]
            then
                cd $BASEDIR/node_modules
                ln -sf ../../$PLUGIN_DIR/$PLUGIN scope-plugin-$PLUGIN
                echo "Symlinked scope-plugin-$PLUGIN to $PLUGIN_DIR/$PLUGIN"
                cd $BASEDIR
            fi
        fi
    done
done
