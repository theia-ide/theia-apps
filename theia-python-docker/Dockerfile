ARG NODE_VERSION=10
FROM node:${NODE_VERSION}-stretch

RUN apt-get update \
    && apt-get install -y python python-dev python-pip \
    && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*

RUN pip install \
    python-language-server \
    flake8 \
    autopep8

ARG version=latest

WORKDIR /home/theia
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn --cache-folder ./ycache && rm -rf ./ycache
RUN yarn theia build
EXPOSE 3000
ENV SHELL /bin/bash
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
