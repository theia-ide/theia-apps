FROM node:8
ARG version=latest
WORKDIR /home/theia
ADD $version.package.json ./package.json
RUN yarn
RUN npx theia build
EXPOSE 3000
ENTRYPOINT [ "npx" ]
CMD theia start . --hostname=0.0.0.0
