ARG NODE_VERSION=12
FROM node:$NODE_VERSION as theia-builder
ARG version=latest
WORKDIR /home/theia
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
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


FROM google/dart

ARG NODE_VERSION=12
ENV NODE_VERSION $NODE_VERSION

RUN apt-get update && \
    apt-get -qq update && \
    apt-get install -y build-essential curl

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

USER theia

# configure Theia
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins

EXPOSE 3000
ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]
