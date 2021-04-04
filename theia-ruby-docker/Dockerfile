ARG NODE_VERSION=12.18.3

FROM node:${NODE_VERSION}
ARG version=latest
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

FROM node:${NODE_VERSION}

# Install Python 3 from source
ARG VERSION=3_0_0

RUN set -eux; \
    \ 
        savedAptMark="$(apt-mark showmanual)"; \
        apt-get update \
        && apt get install -y --no-install-recommends \
        && bison dpkg-dev libgdm-dev ruby \
        ; \
        && rm -rf /var/lib/apt/lists/*; \
        \
        && wget ruby.tar.gz "https://github.com/ruby/ruby/archive/refs/tags/v${VERSION}.tar.gz" \
        \
        && mkdir -p /usr/src/ruby; \
        && tar -xzf ruby.tar.gz -C /usr/src/ruby --strip-components=1; \
        && rm ruby.tar.gz; \
        \
        && cd /usr/src/ruby; \
        \
        { \
            echo '#define ENABLE_PATH_CHECK 0'; \
            echo; \
            cat file.c; \
        } > file.c.new; \
        mv file.c.new file.c; \
        \
        autoconf; \
        gnuArch="$(dpkg-architecture --query DEB_BUILD_GNU_TYPE)"; \
        ./configure \
            --build="$gnuArch" \
            --disable-install-doc \
            --enable-shared \
        ; \
        make -j "$(nproc)"; \
        make install; \
        apt-mark auto '.*' > /dev/null; \
	    apt-mark manual $savedAptMark > /dev/null; \
	    find /usr/local -type f -executable -not \( -name '*tkinter*' \) -exec ldd '{}' ';' \
            | awk '/=>/ { print $(NF-1) }' \
            | sort -u \
            | xargs -r dpkg-query --search \
            | cut -d: -f1 \
            | sort -u \
            | xargs -r apt-mark manual \
        ; \
        apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
        \
        cd /; \
        rm -r /usr/src/ruby; \
    # verify we have no "ruby" packages installed
        ! dpkg -l | grep -i ruby; \
        [ "$(command -v ruby)" = '/usr/local/bin/ruby' ]; \
    # rough smoke test
        ruby --version; \
        gem --version; \
        bundle --version

RUN mkdir -p /home/theia \
    && mkdir -p /home/project
ENV HOME /home/theia
WORKDIR /home/theia
COPY --from=0 /home/theia /home/theia
EXPOSE 3000
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins
ENV USE_LOCAL_GIT true
ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]
