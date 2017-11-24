
FROM ibmcom/ibmjava:8-sdk as java-base

FROM ibmcom/ibmnode:8
COPY --from=java-base /opt/ibm/java /opt/ibm/java

ENV JAVA_HOME=/opt/ibm/java/jre \
    PATH=/opt/ibm/java/jre/bin:$PATH

RUN apt-get update && \
  apt-get install -y curl apt-transport-https && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn && \
  rm -rf /var/lib/apt/lists/*

RUN useradd --create-home theia
WORKDIR /home/theia
USER theia

ARG version=latest
ADD $version.package.json ./package.json
RUN yarn
RUN npx theia build
EXPOSE 3000
ENTRYPOINT [ "npx" ]
CMD theia start /home/project --hostname=0.0.0.0 
