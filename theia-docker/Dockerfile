# 0. Docker client
FROM docker:latest
# 1. Docker compose
FROM docker/compose:latest
# 2. Theia
FROM node:10-alpine
RUN apk add --no-cache make gcc g++ python
ARG version=latest
WORKDIR /home/theia
ADD package.json ./package.json
RUN yarn --pure-lockfile && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn --production && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean
# 3. Theia 2
FROM node:10-alpine
# See : https://github.com/theia-ide/theia-apps/issues/34
RUN addgroup theia && \
    adduser -G theia -s /bin/sh -D theia;
RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;
RUN apk add --no-cache git openssh bash rsync curl
# Docker machine
RUN base=https://github.com/docker/machine/releases/download/v0.16.0 && \
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine && \
  mv /tmp/docker-machine /usr/local/bin/docker-machine && \
  chmod +x /usr/local/bin/docker-machine
ENV HOME /home/theia
WORKDIR /home/theia
# Docker client
COPY --from=0 /usr/local/bin /usr/local/bin
# Docker compose
COPY --from=1 /usr/local/bin /usr/local/bin
#  Theia build
COPY --from=2 --chown=theia:theia /home/theia /home/theia
EXPOSE 3000
ENV SHELL /bin/bash
ENV USE_LOCAL_GIT true
USER theia
ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/theia/project", "--hostname=0.0.0.0" ]
