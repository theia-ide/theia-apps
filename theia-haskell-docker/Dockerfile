ARG NODE_VERSION=10
FROM node:${NODE_VERSION}-stretch

RUN curl -sSL https://get.haskellstack.org/ | sh

ARG HASKELL_VERSION=8.6.4
ARG HIE_VERSION=0.9.0.0

RUN git clone https://github.com/haskell/haskell-ide-engine --recursive --depth 1 --branch ${HIE_VERSION} && \
  cd haskell-ide-engine && \
  stack ./install.hs hie-${HASKELL_VERSION} && \
  stack ./install.hs build-doc

ARG version=latest

WORKDIR /home/theia
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn --cache-folder ./ycache && rm -rf ./ycache
RUN yarn theia build
EXPOSE 3000
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins
ENV PATH=$PATH:/haskell-ide-engine

ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
