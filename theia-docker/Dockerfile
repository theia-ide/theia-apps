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
# See : https://github.com/theia-ide/theia-apps/issues/34
RUN addgroup theia && \ 
    adduser -G theia -s /bin/sh -D theia;
RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown theia:theia /home/project;    
RUN apk add --no-cache git openssh bash
WORKDIR /home/project
COPY --from=0 /home/theia /home/theia
EXPOSE 3000
ENV SHELL /bin/bash
ENV USE_LOCAL_GIT true
USER theia
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
