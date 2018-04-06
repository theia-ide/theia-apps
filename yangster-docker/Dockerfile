FROM node:8-alpine
RUN apk add --no-cache make gcc g++ python
ARG version=latest
WORKDIR /home/theia
ADD $version.package.json ./package.json
RUN yarn && \
    yarn theia build && \
    rm -rf ./node_modules/electron && \
    yarn cache clean

FROM node:8-alpine
RUN apk add --no-cache git openssh bash openjdk8 unzip
# See : https://github.com/theia-ide/theia-apps/issues/34
RUN addgroup theia && \ 
    adduser -G theia -s /bin/sh -D theia;
RUN chmod g+rw /home && \
    mkdir -p /home/theia/project && \
    chown -R theia:theia /home/theia/project;
WORKDIR /home/theia
COPY --from=0 /home/theia /home/theia
EXPOSE 3000
ENV SHELL /bin/bash
ENV USE_LOCAL_GIT true
USER theia
ENTRYPOINT [ "yarn", "theia", "start", "/home/theia/project", "--hostname=0.0.0.0" ]
