ARG NODE_VERSION=10
FROM node:$NODE_VERSION as extension-builder

RUN npm install -g vsce

RUN git clone --depth 1 https://github.com/apple/sourcekit-lsp

WORKDIR /sourcekit-lsp/Editors/vscode
RUN npm install
RUN npm run postinstall
RUN vsce package -o ./sourcekit-lsp.vsix


FROM satishbabariya/swift as lsp-builder

RUN apt-get -q update && \
    apt-get -q install -y \
    sqlite3 \
    libsqlite3-dev \
    libblocksruntime-dev

# Download and Build Sourcekit-LSP
RUN git clone --depth 1 https://github.com/apple/sourcekit-lsp
WORKDIR /sourcekit-lsp
RUN swift build -Xcxx -I/usr/lib/swift && mv `swift build --show-bin-path`/sourcekit-lsp /usr/bin/
RUN chmod -R o+r /usr/bin/sourcekit-lsp



FROM node:8 as theia-builder

ARG version=latest

WORKDIR /home/theia
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn --cache-folder ./ycache && rm -rf ./ycache
RUN yarn --pure-lockfile && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn --production && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    rm -rf ./node_modules/electron && \
    yarn cache clean



FROM satishbabariya/swift

# Print Installed Swift Version
RUN swift --version

# Set absolute path to the swift toolchain
ENV SOURCEKIT_TOOLCHAIN_PATH=/usr/lib/swift

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y build-essential
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs
RUN node --version

# Sourcekit-LSP Executable
COPY --from=lsp-builder /usr/bin/sourcekit-lsp /usr/bin/
ENV PATH=/usr/bin/sourcekit-lsp:$PATH


## Git and sudo (sudo needed for user override)
RUN apt-get -y install git sudo

RUN adduser --disabled-password --gecos '' theia && \
    adduser theia sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers;

RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;

ENV HOME /home/theia
WORKDIR /home/theia
COPY --from=theia-builder /home/theia /home/theia

# Copy Sourcekit-lsp VSCode Extension to theia plugins
COPY --from=extension-builder /sourcekit-lsp/Editors/vscode/sourcekit-lsp.vsix /home/theia/plugins/
ENV THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins

EXPOSE 3000
ENV SHELL /bin/bash
ENV USE_LOCAL_GIT true

USER theia
ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]