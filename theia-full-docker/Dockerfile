FROM ubuntu:18.04

ENV DEBIAN_FRONTEND noninteractive

ARG GITHUB_TOKEN
ARG NODE_VERSION=12.18.3
ENV NODE_VERSION $NODE_VERSION
ENV YARN_VERSION 1.13.0

# use "latest" or "next" version for Theia packages
ARG version=latest

# Optionally build a striped Theia application with no map file or .ts sources.
# Makes image ~150MB smaller when enabled
ARG strip=false
ENV strip=$strip

#Common deps
RUN apt-get update && \
    apt-get -y install build-essential \
                       curl \
                       git \
                       gpg \
                       python \
                       wget \
                       xz-utils

#Install node and yarn
#From: https://github.com/nodejs/docker-node/blob/6b8d86d6ad59e0d1e7a94cec2e909cad137a028f/8/Dockerfile

# gpg keys listed at https://github.com/nodejs/node#release-keys
RUN set -ex \
    && for key in \
    4ED778F539E3634C779C87C6D7062848A1AB005C \
    B9E2F5981AA6E0CD28160D9FF13993A75599653C \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    77984A986EBC2AA786BC0F66B01FBB92821C587A \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    A48C2BEE680E841632CD4E44F07496B3EB3C1762 \
    ; do \
    gpg --batch --keyserver ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver pgp.mit.edu --recv-keys "$key" || \
    gpg --batch --keyserver keyserver.pgp.com --recv-keys "$key" || \
    gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
    done

RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    i386) ARCH='x86';; \
    *) echo "unsupported architecture"; exit 1 ;; \
    esac \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
    && curl -SLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
    && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs


RUN set -ex \
    && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
    ; do \
    gpg --batch --keyserver ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver pgp.mit.edu --recv-keys "$key" || \
    gpg --batch --keyserver keyserver.pgp.com --recv-keys "$key" || \
    gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
    done \
    && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
    && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
    && mkdir -p /opt/yarn \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/yarn --strip-components=1 \
    && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn \
    && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz

#Developer tools

## Git and sudo (sudo needed for user override)
RUN apt-get update && apt-get -y install git sudo

#LSPs

##GO
ENV GO_VERSION=1.15 \
    GOOS=linux \
    GOARCH=amd64 \
    GOROOT=/usr/local/go \
    GOPATH=/usr/local/go-packages
ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH

# install Go
RUN curl -fsSL https://storage.googleapis.com/golang/go$GO_VERSION.$GOOS-$GOARCH.tar.gz | tar -C /usr/local -xzv

# install VS Code Go tools: https://github.com/Microsoft/vscode-go/blob/058eccf17f1b0eebd607581591828531d768b98e/src/goInstallTools.ts#L19-L45
RUN go get -u -v github.com/mdempsky/gocode && \
    go get -u -v github.com/uudashr/gopkgs/cmd/gopkgs && \
    go get -u -v github.com/ramya-rao-a/go-outline && \
    go get -u -v github.com/acroca/go-symbols && \
    go get -u -v golang.org/x/tools/cmd/guru && \
    go get -u -v golang.org/x/tools/cmd/gorename && \
    go get -u -v github.com/fatih/gomodifytags && \
    go get -u -v github.com/haya14busa/goplay/cmd/goplay && \
    go get -u -v github.com/josharian/impl && \
    go get -u -v github.com/tylerb/gotype-live && \
    go get -u -v github.com/rogpeppe/godef && \
    go get -u -v github.com/zmb3/gogetdoc && \
    go get -u -v golang.org/x/tools/cmd/goimports && \
    go get -u -v github.com/sqs/goreturns && \
    go get -u -v winterdrache.de/goformat/goformat && \
    go get -u -v golang.org/x/lint/golint && \
    go get -u -v github.com/cweill/gotests/... && \
    go get -u -v github.com/alecthomas/gometalinter && \
    go get -u -v honnef.co/go/tools/... && \
    GO111MODULE=on go get github.com/golangci/golangci-lint/cmd/golangci-lint && \
    go get -u -v github.com/mgechev/revive && \
    go get -u -v github.com/sourcegraph/go-langserver && \
    go get -u -v github.com/go-delve/delve/cmd/dlv && \
    go get -u -v github.com/davidrjenni/reftools/cmd/fillstruct && \
    go get -u -v github.com/godoctor/godoctor

RUN go get -u -v -d github.com/stamblerre/gocode && \
    go build -o $GOPATH/bin/gocode-gomod github.com/stamblerre/gocode

ENV PATH=$PATH:$GOPATH/bin


#Java
RUN apt-get update && apt-get -y install openjdk-11-jdk maven gradle


#C/C++
# public LLVM PPA, development version of LLVM
ARG LLVM=12

RUN wget -O - https://apt.llvm.org/llvm-snapshot.gpg.key | apt-key add - && \
    echo "deb http://apt.llvm.org/bionic/ llvm-toolchain-bionic main" > /etc/apt/sources.list.d/llvm.list && \
    apt-get update && \
    apt-get install -y \
                       clang-tools-$LLVM \
                       clangd-$LLVM \
                       clang-tidy-$LLVM \
                       gcc-multilib \
                       g++-multilib \
                       gdb && \
    ln -s /usr/bin/clang-$LLVM /usr/bin/clang && \
    ln -s /usr/bin/clang++-$LLVM /usr/bin/clang++ && \
    ln -s /usr/bin/clang-cl-$LLVM /usr/bin/clang-cl && \
    ln -s /usr/bin/clang-cpp-$LLVM /usr/bin/clang-cpp && \
    ln -s /usr/bin/clang-tidy-$LLVM /usr/bin/clang-tidy && \
    ln -s /usr/bin/clangd-$LLVM /usr/bin/clangd

# Install latest stable CMake
ARG CMAKE_VERSION=3.18.1

RUN wget "https://github.com/Kitware/CMake/releases/download/v$CMAKE_VERSION/cmake-$CMAKE_VERSION-Linux-x86_64.sh" && \
    chmod a+x cmake-$CMAKE_VERSION-Linux-x86_64.sh && \
    ./cmake-$CMAKE_VERSION-Linux-x86_64.sh --prefix=/usr/ --skip-license && \
    rm cmake-$CMAKE_VERSION-Linux-x86_64.sh


#Python 2-3
RUN apt-get update \
    && apt-get install -y software-properties-common \
    && add-apt-repository -y ppa:deadsnakes/ppa \
    && apt-get install -y python-dev python-pip \
    && apt-get install -y python3.8 python3-dev python3-pip \
    && apt-get remove -y software-properties-common \
    && python -m pip install --upgrade pip --user \
    && python3.8 -m pip install --upgrade pip --user \
    && pip3 install python-language-server flake8 autopep8


#.NET Core SDK
ARG DOTNET_VERSION=3.1
# disables .NET telemetry
ENV DOTNET_CLI_TELEMETRY_OPTOUT 1
# suppresses .NET welcome message
ENV DOTNET_SKIP_FIRST_TIME_EXPERIENCE 1

RUN curl -SLO "https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb" \
    && dpkg -i packages-microsoft-prod.deb \
    && rm packages-microsoft-prod.deb \
    && apt-get update \
    && apt-get install -y dotnet-sdk-$DOTNET_VERSION


#PHP
ARG PHP_VERSION=7.4

RUN apt-get update \
    && apt-get install -y software-properties-common \
    && add-apt-repository -y ppa:ondrej/php \
    && apt-get install -y curl php$PHP_VERSION php$PHP_VERSION-cli php$PHP_VERSION-mbstring unzip php$PHP_VERSION-common php$PHP_VERSION-json php-yaml php-xdebug \
    && apt-get remove -y software-properties-common
RUN echo '[XDebug]\n\
xdebug.remote_enable = 1\n\
xdebug.remote_autostart = 1' >> /etc/php/$PHP_VERSION/mods-available/xdebug.ini
RUN curl -s -o composer-setup.php https://getcomposer.org/installer \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php


#Ruby
RUN apt-get update && apt-get -y install ruby ruby-dev zlib1g-dev && \
    gem install solargraph


#Swift
ARG SWIFT_VERSION=5.2.4

RUN apt-get update \
    && apt-get install -y binutils libc6-dev libcurl4 libedit2 libgcc-5-dev libpython2.7 libsqlite3-0 libstdc++-5-dev libxml2 pkg-config tzdata zlib1g-dev \
    && curl -SLO https://swift.org/builds/swift-$SWIFT_VERSION-release/ubuntu1804/swift-$SWIFT_VERSION-RELEASE/swift-$SWIFT_VERSION-RELEASE-ubuntu18.04.tar.gz \
    && curl -SLO https://swift.org/builds/swift-$SWIFT_VERSION-release/ubuntu1804/swift-$SWIFT_VERSION-RELEASE/swift-$SWIFT_VERSION-RELEASE-ubuntu18.04.tar.gz.sig \
    && wget -q -O - https://swift.org/keys/all-keys.asc | gpg --import - \
    && (    gpg --keyserver pool.sks-keyservers.net --refresh-keys Swift \
         || gpg --keyserver ipv4.pool.sks-keyservers.net --refresh-keys Swift \
         || gpg --keyserver pool.sks-keyservers.net --refresh-keys Swift \
         || gpg --keyserver pgp.mit.edu --refresh-keys Swift \
         || gpg --keyserver keyserver.pgp.com --refresh-keys Swift \
         || gpg --keyserver ha.pool.sks-keyservers.net --refresh-keys Swift \
       ) \
    && gpg --verify swift-$SWIFT_VERSION-RELEASE-ubuntu18.04.tar.gz.sig \
    && tar fxz swift-$SWIFT_VERSION-RELEASE-ubuntu18.04.tar.gz \
    && rm swift-$SWIFT_VERSION-RELEASE-ubuntu18.04.tar.gz swift-$SWIFT_VERSION-RELEASE-ubuntu18.04.tar.gz.sig \
    && mv swift-$SWIFT_VERSION-RELEASE-ubuntu18.04 /usr/local/swift \
    && ln -s /usr/local/swift/usr/bin/swift* /usr/bin \
    && ln -s /usr/local/swift/usr/bin/lldb* /usr/bin \
    && ln -s /usr/local/swift/usr/bin/sourcekit-lsp /usr/bin


#Dart
ENV DART_VERSION 2.9.0

RUN \
  apt-get update && apt-get install --no-install-recommends -y -q gnupg2 curl git ca-certificates apt-transport-https openssh-client && \
  curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list && \
  curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_testing.list > /etc/apt/sources.list.d/dart_testing.list && \
  curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_unstable.list > /etc/apt/sources.list.d/dart_unstable.list && \
  apt-get update && \
  apt-get install dart=$DART_VERSION-1

ENV DART_SDK /usr/lib/dart
ENV PATH $DART_SDK/bin:/theia/.pub-cache/bin:$PATH


## User account
RUN adduser --disabled-password --gecos '' theia && \
    adduser theia sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    mkdir -p /home/theia/.pub-cache/bin && \
    mkdir -p /usr/local/cargo && \
    mkdir -p /usr/local/go && \
    mkdir -p /usr/local/go-packages && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project && \
    chown -R theia:theia /usr/local/cargo && \
    chown -R theia:theia /usr/local/go && \
    chown -R theia:theia /usr/local/go-packages


# Theia application
##Needed for node-gyp, nsfw build
RUN apt-get update && apt-get install -y python build-essential && \
  apt-get clean && \
  apt-get autoremove -y && \
  rm -rf /var/cache/apt/* && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /tmp/*

USER theia
WORKDIR /home/theia
ADD $version.package.json ./package.json

RUN if [ "$strip" = "true" ]; then \
yarn --pure-lockfile && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn theia download:plugins && \
    yarn --production && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean \
;else \
yarn --cache-folder ./ycache && rm -rf ./ycache && \
     NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && yarn theia download:plugins \
;fi

# Change permissions to make the `yang-language-server` executable.
RUN chmod +x ./plugins/yangster/extension/server/bin/yang-language-server

EXPOSE 3000
# configure Theia
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins  \
    # configure user Go path
    GOPATH=/home/project

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]
