#!/bin/bash
args=( $@ )
SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
\cd $SCRIPTPATH
node src-gen/backend/main.js ${args[*]}
