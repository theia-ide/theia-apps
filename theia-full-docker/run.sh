#!/usr/bin/env bash
set -e
set -x

docker build \
  --nocache \
  --tag docker.io/colemickens/theia \
  --build-arg version=next \
  .

docker run -it \
  --volume /home/cole/code:/code \
  --volume /home/cole/.gitconfig:/root/.gitconfig \
  --volume /home/cole/.theia:/root/.theia \
  --volume /home/cole/.cargo/registry:/root/.cargo/registry \
  --volume /home/cole/.go:/root/.go \
  --volume /etc/nixcfg:/nixcfg \
  --volume /etc/nixpkgs:/nixpkgs \
  --publish 0.0.0.0:1111:1111 \
  --publish 0.0.0.0:3000:3000 \
  --publish 0.0.0.0:5555:5555 \
  --publish 0.0.0.0:5556:5556 \
    docker.io/colemickens/theia

exit

#  --env GOPATH=/code \
