ARG NODE_VERSION=12-buster
FROM node:$NODE_VERSION

ARG VERSION=3.8.3

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y make build-essential libssl-dev net-tools && \
    apt-get install -y gcc g++ python libx11-dev libxkbfile-dev && \
    apt-get install -y wget curl nano


RUN apt-get update && \
    apt-get install -y apt-transport-https && \
    wget https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb

RUN apt-get update && \
    apt-get install -y dotnet-sdk-5.0

RUN apt-get update && \
    apt-get install -y yarn && \
    apt-get clean && \
    apt-get auto-remove -y && \
    rm -rf /var/cache/apt/* && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

RUN mkdir -p /home/theia && \
    mkdir -p /home/project
WORKDIR /home/theia

ARG version=latest
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn global add node-gyp && \
    yarn --cache-folder ./ycache && rm -rf ./ycache && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn theia download:plugins

RUN wget https://github.com/Samsung/netcoredbg/releases/download/1.2.0-635/netcoredbg-linux-bionic.tar.gz && \
    tar -xvf netcoredbg-linux-bionic.tar.gz && \
    ln -s /home/theia/netcoredbg/netcoredbg /usr/bin/netcoredbg && \
    rm netcoredbg-linux-bionic.tar.gz

EXPOSE 3000
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]

