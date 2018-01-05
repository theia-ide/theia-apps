FROM node:8
ARG version=latest
RUN apt-get update && \
    apt-get install -y curl
RUN curl -sS https://storage.googleapis.com/golang/go1.9.2.linux-amd64.tar.gz | tar -C /usr/local -xzf -
ENV PATH $PATH:/usr/local/go/bin
RUN go get -u -v github.com/ramya-rao-a/go-outline
RUN go get -u -v github.com/acroca/go-symbols
RUN go get -u -v github.com/nsf/gocode
RUN go get -u -v github.com/rogpeppe/godef
RUN go get -u -v golang.org/x/tools/cmd/godoc
RUN go get -u -v github.com/zmb3/gogetdoc
RUN go get -u -v github.com/golang/lint/golint
RUN go get -u -v github.com/fatih/gomodifytags
RUN go get -u -v github.com/uudashr/gopkgs/cmd/gopkgs
RUN go get -u -v golang.org/x/tools/cmd/gorename
RUN go get -u -v sourcegraph.com/sqs/goreturns
RUN go get -u -v github.com/cweill/gotests/...
RUN go get -u -v golang.org/x/tools/cmd/guru
RUN go get -u -v github.com/josharian/impl
RUN go get -u -v github.com/haya14busa/goplay/cmd/goplay
WORKDIR /home/theia
ADD $version.package.json ./package.json
RUN yarn --cache-folder ./ycache
RUN rm -rf ./ycache
RUN yarn theia build
EXPOSE 3000
ENV SHELL /bin/bash
RUN mkdir /root/.go
RUN echo '{"toolsGopath":"/root/go"}' > /root/.go/go.json
ENV GOPATH /home/project
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
