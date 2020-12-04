FROM ubuntu:bionic
# install development tools
RUN apt-get update && \
    apt-get install -y curl sudo build-essential jq vim && \
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

# add theia installation file
COPY package.json run_theia.sh /theia-app/
RUN chmod +x /theia-app/run_theia.sh

# build theia
WORKDIR /theia-app
RUN yarn && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean

# create debian package
RUN npm run build-deb

# transfer debian package to a new clean image and install theia
FROM ubuntu:bionic
COPY --from=0 /theia-app/theia-example_0.0.1_all.deb /
RUN apt-get update && apt-get install -y curl sudo && \
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - && \
    apt-get install -y ./theia-example_0.0.1_all.deb && \
    rm theia-example_0.0.1_all.deb

ENV SHELL /bin/bash
EXPOSE 3000
CMD ["theia","start","--hostname=0.0.0.0"]
