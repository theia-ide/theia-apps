#!/bin/bash
CURDIR=$(pwd)
echo "container start path: $CONTAINER_START_PATH"
echo "theia root dir: $CURDIR"

cd $THEIA_RUST_APP_PATH
yarn theia start $CURDIR --hostname=0.0.0.0 --log-level=debug --verbose

