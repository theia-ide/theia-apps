FROM node:8
ARG version=latest
RUN useradd -m theia
USER theia
WORKDIR /home/theia
ADD $version.package.json ./package.json
RUN yarn
RUN npx theia build
EXPOSE 3000
ENV SHELL /bin/bash
ENTRYPOINT [ "npx", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
