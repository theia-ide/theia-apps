ARG NODE_VERSION=12
FROM node:$NODE_VERSION as extension-builder
RUN npm install -g vsce
RUN git clone --depth 1 https://github.com/apple/sourcekit-lsp
WORKDIR /sourcekit-lsp/Editors/vscode
RUN npm install
RUN npm run vscode:prepublish
RUN vsce package -o ./sourcekit-lsp.vsix


FROM node:$NODE_VERSION as theia-builder
ARG version=latest
WORKDIR /home/theia
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn --cache-folder ./ycache && rm -rf ./ycache
RUN yarn --pure-lockfile && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn theia download:plugins && \
    yarn --production && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean


FROM swift

ENV DEBIAN_FRONTEND noninteractive
ARG NODE_VERSION=12
ENV NODE_VERSION $NODE_VERSION
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y build-essential
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash
RUN apt-get install -y nodejs
RUN apt-get -y install git sudo

RUN adduser --disabled-password --gecos '' theia && \
    adduser theia sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers;

RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;

ENV HOME /home/theia
WORKDIR /home/theia
COPY --from=theia-builder /home/theia /home/theia

# Copy Sourcekit-lsp VSCode Extension to theia plugins
COPY --from=extension-builder /sourcekit-lsp/Editors/vscode/sourcekit-lsp.vsix /home/theia/plugins/
ENV THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins

EXPOSE 3000
ENV SHELL /bin/bash

USER theia
ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]
