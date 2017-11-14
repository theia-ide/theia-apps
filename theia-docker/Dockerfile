FROM node:8
ARG version=latest
WORKDIR /home/theia
ADD $version.package.json ./package.json
RUN yarn
RUN npx theia build
EXPOSE 3000
STOPSIGNAL SIGTERM
CMD npx theia start .
