FROM node:8-alpine
RUN apk add --no-cache make gcc g++ python git openssh bash
ARG version=latest
WORKDIR /home/theia
ADD $version.package.json ./package.json
RUN yarn && \
    yarn theia build && \
    rm -rf ./node_modules/electron && \
    yarn cache clean
EXPOSE 3000
ENV SHELL /bin/bash
ENV USE_LOCAL_GIT true
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
