#!/bin/bash
set -e

# this script is called by Travis to build the Docker image
NPM_TAG=$1
IMAGE_NAME=$2
NODEVERSION=$3

cd "$IMAGE_NAME-docker"

IMAGE="theiaide/$IMAGE_NAME"
IMAGE_TAG="$IMAGE":$(npm view "@theia/core@$NPM_TAG" version)
echo $IMAGE_TAG
docker build --build-arg "version=$NPM_TAG" --build-arg "NODE_VERSION=$NODE_VERSION" --build-arg "GITHUB_TOKEN=$GITHUB_TOKEN" . -t "$IMAGE_TAG" --no-cache
docker tag "$IMAGE_TAG" "$IMAGE:$NPM_TAG"
docker run --init -d -p 0.0.0.0:4000:3000 "$IMAGE_TAG"
