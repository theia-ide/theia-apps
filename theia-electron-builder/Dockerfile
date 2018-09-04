FROM electronuserland/builder:wine

# Replace shell with bash so we can source files.
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -q --fix-missing \
# Install `add-apt-repository`
    && apt-get install -y -q software-properties-common \
# Oracle JDK 8
    && add-apt-repository ppa:webupd8team/java \
# Git
    && add-apt-repository ppa:git-core/ppa \
# Python 2.7
    && add-apt-repository ppa:deadsnakes/ppa \
# g++ and gcc
    && add-apt-repository ppa:ubuntu-toolchain-r/test \
    && apt-get update \
# Required due to the licensing of the Oracle JDK.
    && /bin/echo debconf shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections \
    && /bin/echo debconf shared/accepted-oracle-license-v1-1 seen true | /usr/bin/debconf-set-selections \
    && apt-get install -y -q --no-install-recommends \
        build-essential \
        libssl-dev \
        curl \
        git \
        oracle-java8-installer \
        python2.7 \
        g++-4.9

# Install Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.9.4

# Install nvm with Node.js and npm.
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.11.4

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Verify the versions.
RUN node --version \
    && yarn --version \
    && python --version \
    && git --version \
    && java -version