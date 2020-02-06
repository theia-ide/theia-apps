ARG NODE_VERSION=10
FROM node:${NODE_VERSION}

# Install Python 3 from source
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y make build-essential libssl-dev \
    && apt-get install -y libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
    && apt-get install -y libncurses5-dev  libncursesw5-dev xz-utils tk-dev \
    && wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tgz \
    && tar xvf Python-3.7.0.tgz \
    && cd Python-3.7.0 \
    && ./configure \
    && make -j8 \
    && make install

RUN apt-get update \
    && apt-get install -y python-dev python-pip \
    && pip install --upgrade pip --user \
    && apt-get install -y python3-dev python3-pip \
    && pip3 install --upgrade pip --user \
    && pip install python-language-server flake8 autopep8 \
    && apt-get install -y yarn \
    && apt-get clean \
    && rm -rf /var/cache/apt/* \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

RUN mkdir -p /home/theia \
    && mkdir -p /home/project
WORKDIR /home/theia

ARG version=latest
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn --cache-folder ./ycache && rm -rf ./ycache && \
    yarn theia build ; \
    yarn theia download:plugins
EXPOSE 3000
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
