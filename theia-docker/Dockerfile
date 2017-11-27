FROM node:8
ARG version=latest
WORKDIR /home/theia
ADD $version.package.json ./package.json
RUN yarn
RUN npx theia build
EXPOSE 3000
ENV SHELL /bin/bash
ENTRYPOINT [ "npx" ]
CMD theia start /home/project --hostname=0.0.0.0

# local inspecting
# EXPOSE 9229
# CMD node --inspect=0.0.0.0:9229 ./src-gen/backend/main.js /home/project --hostname=0.0.0.0 --no-cluster
