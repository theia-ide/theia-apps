
FROM openjdk:8 as java-base

FROM node:8
COPY --from=java-base /usr/lib/jvm/java-8-openjdk-amd64 /usr/java/openjdk-8

ENV JAVA_HOME=/usr/java/openjdk-8 \
    PATH=/usr/java/openjdk-8/bin:$PATH

RUN apt-get update && \
  apt-get install -y curl apt-transport-https && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*
# See : https://github.com/theia-ide/theia-apps/issues/34
RUN adduser --disabled-password --gecos '' theia
RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;
WORKDIR /home/theia
USER theia

ARG version=latest
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn --cache-folder ./ycache && rm -rf ./ycache
RUN yarn theia build && yarn cache clean
EXPOSE 3000
ENV SHELL /bin/bash
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
