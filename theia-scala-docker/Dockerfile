FROM ubuntu:19.10

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils curl wget ca-certificates apt-transport-https zip unzip git make gcc pkg-config build-essential libx11-dev libxkbfile-dev python-dev python-pip

RUN pip install ast

#Install RE2 regular expression engine (required by Scala native projects and has no deb available)
RUN git clone https://github.com/google/re2.git && \
  cd re2 && \
  make && \
  make test && \
  make install && \
  cd .. && \
  rm -rf re2

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  apt-get install -y --no-install-recommends nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt update && apt install --no-install-recommends yarn

#Add native compilation dependencies (required by Scala native)
RUN apt-get install -y --no-install-recommends clang libgc-dev libunwind-dev

#Cleanup debian repo lists
RUN rm -rf /var/lib/apt/lists/*

#Trick to be able to install sdkman on ubuntu container
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# See : https://github.com/theia-ide/theia-apps/issues/34
RUN adduser --disabled-password --gecos '' theia
RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;
WORKDIR /home/theia
USER theia

#Install sdkman
ENV SDKMAN_DIR=/home/theia/.sdkman
RUN curl -s "https://get.sdkman.io" | bash && \
    echo "sdkman_auto_answer=true" > $SDKMAN_DIR/etc/config && \
    echo "sdkman_auto_selfupdate=false" >> $SDKMAN_DIR/etc/config
RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && \
#Install sdks
    sdk install java 11.0.7.hs-adpt && \
    sdk install scala 2.13.2 && \
    sdk install maven && \
    sdk install gradle && \
    sdk install sbt && \
#Cleanup sdkman
    rm -rf $HOME/.sdkman/archives/* && \
    rm -rf $HOME/.sdkman/tmp/*


ENV JAVA_HOME="$SDKMAN_DIR/candidates/java/current"
ENV PATH="$JAVA_HOME/bin:$PATH"

#Install bloop
ENV BLOOP_HOME=/home/theia/.bloop \
    PATH=/home/theia/.bloop:$PATH
RUN curl -L https://github.com/scalacenter/bloop/releases/download/v1.4.0-RC1/install.py | python - --dest $BLOOP_HOME

ARG version=latest
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
RUN yarn --cache-folder ./ycache && rm -rf ./ycache && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build ; \
    yarn theia download:plugins
EXPOSE 3000
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins
ENTRYPOINT [ "yarn", "theia", "start", "/home/project", "--hostname=0.0.0.0" ]
