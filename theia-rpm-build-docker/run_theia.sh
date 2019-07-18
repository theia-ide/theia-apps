#!/bin/bash
\cd /usr/lib/theia
args=( $@ )
node src-gen/backend/main.js ${args[*]}

