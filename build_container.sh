#!/bin/bash
set -e

# this script is called by Travis to build the Docker image
NPM_TAG=$1
IMAGE_NAME=$2
NODE_VERSION=$3

# Theia standard port is listening in port 3000 (the common nodejs port), and it is exposed when running the docker
# container (-p 0.0.0.0:4000:3000). But some new applications may need to change it (e.g. theia-https-docker).
# This 4th parameter enables to expose a custom port instead of the common 3000 port. It is set to 3000 as a default
# value if not included, for backward compatibility.
PORT=${4:-3000}
shift
shift
shift

# We know that there are at least 3 parameters. If we shift the 4th parameter and it is not set, shift will fail thus
# failing the script (because of set -e)
[ $# -gt 0 ] && shift

cd "$IMAGE_NAME-docker"

IMAGE="theiaide/$IMAGE_NAME"
IMAGE_TAG="$IMAGE":$(npm view "@theia/core@$NPM_TAG" version)
echo $IMAGE_TAG
docker build --build-arg "version=$NPM_TAG" --build-arg "NODE_VERSION=$NODE_VERSION" --build-arg "GITHUB_TOKEN=$GH_TOKEN" . -t "$IMAGE_TAG" --no-cache
docker tag "$IMAGE_TAG" "$IMAGE:$NPM_TAG"

# Now we allow to pass extra parameters to the docker run command: any extra parameter to build_container.sh is
# interpreted as a parameter to docker run (it is useful for e.g. passing environment variables or volume mappings)
docker run --init -d "$@" -p 0.0.0.0:4000:$PORT "$IMAGE_TAG"
