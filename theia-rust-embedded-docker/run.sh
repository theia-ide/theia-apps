#!/bin/bash
CURDIR=$(pwd)
echo "container start path: $CONTAINER_START_PATH"
echo "theia root dir: $CURDIR"

# contains cortex-debug plugin
export THEIA_DEFAULT_PLUGINS=local-dir:$THEIA_RUST_APP_PATH/plugins

cd $THEIA_RUST_APP_PATH
yarn theia start $CURDIR --hostname=0.0.0.0 --log-level=debug --verbose

