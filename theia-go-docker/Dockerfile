FROM node:8
ARG version=latest
RUN apt-get update && \
    apt-get install -y curl
ENV GO_VERSION 1.11.4
RUN curl -sS https://dl.google.com/go/go$GO_VERSION.linux-amd64.tar.gz | tar -C /usr/local -xzf -
ENV PATH $PATH:/usr/local/go/bin
ENV GOPATH=/home/theia/go
ENV PATH $PATH:${GOPATH}/bin
WORKDIR /home/theia
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn --cache-folder ./ycache && rm -rf ./ycache
RUN yarn theia build
# See : https://github.com/theia-ide/theia-apps/issues/34
RUN adduser --disabled-password --gecos '' theia
RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;
EXPOSE 3000
ENV SHELL /bin/bash
USER theia
RUN go get -u -v github.com/ramya-rao-a/go-outline && \
    go get -u -v github.com/acroca/go-symbols && \
    go get -u -v github.com/nsf/gocode && \
    go get -u -v github.com/rogpeppe/godef && \
    go get -u -v golang.org/x/tools/cmd/godoc && \
    go get -u -v github.com/zmb3/gogetdoc && \
    go get -u -v golang.org/x/lint/golint && \
    go get -u -v github.com/fatih/gomodifytags && \
    go get -u -v github.com/uudashr/gopkgs/cmd/gopkgs && \
    go get -u -v golang.org/x/tools/cmd/gorename && \
    go get -u -v sourcegraph.com/sqs/goreturns && \
    go get -u -v github.com/cweill/gotests/... && \
    go get -u -v golang.org/x/tools/cmd/guru && \
    go get -u -v github.com/josharian/impl && \
    go get -u -v github.com/haya14busa/goplay/cmd/goplay && \
    go get -u -v github.com/davidrjenni/reftools/cmd/fillstruct
RUN mkdir -p /home/theia/.go
RUN echo '{"toolsGopath":"/home/theia/go"}' > /home/theia/.go/go.json
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
