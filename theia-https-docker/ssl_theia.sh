#!/bin/bash
#
# sec-theia-ide - add a security layer to theia-ide (https and token authentication)
#
# https://github.com/dealfonso/sec-theia-ide
#
# Copyright (C) GRyCAP - I3M - UPV
# Developed by Carlos A. caralla@upv.es
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# 
FOLDER=${FOLDER:-/tmp/ssl}
mkdir -p "$FOLDER"
KEYFILE="${FOLDER}/server.key"
CERTFILE="${FOLDER}/server.crt"
DEBUG="${DEBUG:-0}"

secure="${secure:-1}"

if [ "$secure" == "1" ]; then

if [ ! -e "$KEYFILE" ]; then
  echo "generating key file for https"
  openssl genrsa -out "$KEYFILE" > /dev/null 2> /dev/null
  if [ $? -ne 0 ]; then
    echo "failed to generate key file" >&2
    exit 1
  fi
fi

if [ ! -e "$CERTFILE" ]; then
  echo "generating cert file for https"
  openssl req -new -key "$KEYFILE" -x509 -days 365 -out "$CERTFILE" -subj /CN=$HOSTNAME > /dev/null
  if [ $? -ne 0 ]; then
    echo "failed to generate cert file" >&2
    exit 1
  fi
fi

fi

if [ "$DEBUG" == "1" ]; then
    node /home/theia/src-gen/backend/main.js /home/project "$@" &
else
    node /home/theia/src-gen/backend/main.js /home/project "$@" 2> /dev/null &
fi

THEIAPID=$!
sleep 3s
if kill -0 $THEIAPID > /dev/null 2> /dev/null; then
  cert="$CERTFILE" key="$KEYFILE" secure=$secure /usr/local/bin/gen-http-proxy localhost:3000
  kill $THEIAPID
else
  echo "could not spawn theia";
fi
