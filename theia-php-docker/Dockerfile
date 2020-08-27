ARG NODE_VERSION=12.18.3
FROM node:${NODE_VERSION}-alpine
ARG version=latest
RUN apk add --no-cache make pkgconfig gcc g++ python libx11-dev libxkbfile-dev
WORKDIR /home/theia
ADD $version.package.json ./package.json
ARG GITHUB_TOKEN
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

FROM node:${NODE_VERSION}-alpine
# See : https://github.com/theia-ide/theia-apps/issues/34
RUN addgroup theia && \
    adduser -G theia -s /bin/sh -D theia;
RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;
RUN apk add --no-cache git openssh bash
RUN apk add --no-cache curl php php-cli php-mbstring unzip php-openssl php-phar php-json php-tokenizer php-ctype php7-pecl-yaml php7-pecl-xdebug
RUN sed -i 's/;zend_extension=xdebug.so/zend_extension=xdebug.so/g' /etc/php7/conf.d/xdebug.ini
RUN echo $'[XDebug]\n\
    xdebug.remote_enable = 1\n\
    xdebug.remote_autostart = 1' >> /etc/php7/conf.d/xdebug.ini
RUN curl -s -o composer-setup.php https://getcomposer.org/installer \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php
ENV HOME=/home/theia \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins \
    SHELL=/bin/bash \
    USE_LOCAL_GIT=true
WORKDIR /home/theia
COPY --from=0 --chown=theia:theia /home/theia /home/theia
COPY --chown=theia:theia ./settings.json /home/theia/.theia/settings.json
EXPOSE 3000
USER theia
ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]
