FROM node:8
RUN echo 'deb http://httpredir.debian.org/debian/ jessie-backports main' >> /etc/apt/sources.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends -t jessie-backports \
  openjdk-8-jre-headless \
  ca-certificates-java \
  openjdk-8-jdk \
  unzip \
  && update-java-alternatives -s java-1.8.0-openjdk-amd64
ARG version=latest
WORKDIR /home/theia
ADD $version.package.json ./package.json
RUN yarn --cache-folder ./ycache
RUN rm -rf ./ycache
RUN yarn theia build
EXPOSE 3000
ENV SHELL /bin/bash
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
