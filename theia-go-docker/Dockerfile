ARG NODE_VERSION=12.18.3

FROM node:$NODE_VERSION as theia

RUN apt-get -qq update && apt-get install -y libsecret-1-dev
ARG GITHUB_TOKEN
ARG version=latest

WORKDIR /home/theia

ADD $version.package.json ./package.json
RUN yarn --pure-lockfile && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn theia download:plugins && \
    yarn --production && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean

FROM node:$NODE_VERSION

RUN apt-get -qq update && \
    apt-get install -y libsecret-1-0

COPY --from=theia /home/theia /home/theia

WORKDIR /home/theia

# See: https://github.com/theia-ide/theia-apps/issues/34
RUN adduser --disabled-password --gecos '' theia && \
    chmod g+rw /home && \
    mkdir -p /home/project && \
    mkdir -p /home/go && \
    mkdir -p /home/go-tools && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project && \
    chown -R theia:theia /home/go && \
    chown -R theia:theia /home/go-tools;

USER theia

## Go
ENV GO_VERSION=1.17.3 \
    GOOS=linux \
    GOARCH=amd64 \
    GOROOT=/usr/local/go \
    GOPATH=/usr/local/go-packages
ENV PATH=$GOROOT/bin:$GOPATH/bin:$PATH

# Install Go
# https://go.dev/doc/install
RUN curl -fsSL https://storage.googleapis.com/golang/go$GO_VERSION.$GOOS-$GOARCH.tar.gz | tar -C /usr/local -xzv

# VS Code Go Tools https://github.com/golang/vscode-go/blob/master/docs/tools.md
RUN go get -u -v github.com/uudashr/gopkgs/cmd/gopkgs@v2 && \
    go get -u -v github.com/ramya-rao-a/go-outline && \
    go get -u -v github.com/cweill/gotests/gotests && \
    go get -u -v github.com/fatih/gomodifytags && \
    go get -u -v github.com/josharian/impl && \
    go get -u -v github.com/haya14busa/goplay/cmd/goplay && \
    go get -u -v github.com/go-delve/delve/cmd/dlv && \
    GO111MODULE=on go get -v github.com/golangci/golangci-lint/cmd/golangci-lint && \
                   go get -u -v golang.org/x/tools/gopls@v0.7.3

# Configure Theia
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins  \
    # Configure user Go path
    GOPATH=/home/project
ENV PATH=$PATH:$GOPATH/bin

EXPOSE 3000
ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]
