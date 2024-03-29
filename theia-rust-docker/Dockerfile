# Can't use node image, because it creates a user that conflicts
FROM ubuntu:18.04 as common

ARG NODE_OPTIONS="--max-old-space-size=4096"
ARG NODE_VERSION=12.18.3

ENV THEIA_RUST_APP_PATH /root/theia_rust_app

RUN apt-get update -yq \
    && apt-get install curl gnupg build-essential gcc g++ gdb make python sudo git -yq libsecret-1-dev

# allow a user to become root in the container
ADD sudoers /etc/sudoers

ADD install_node.sh /root/install_node.sh
RUN bash /root/install_node.sh --version $NODE_VERSION
ADD nvm_setup.sh /root/nvm_setup.sh

FROM common as theia

ARG GITHUB_TOKEN

# install theia
RUN mkdir $THEIA_RUST_APP_PATH
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn global add node-gyp
ADD next.package.json $THEIA_RUST_APP_PATH/package.json
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn --cache-folder $THEIA_RUST_APP_PATH/ycache && \
    . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn theia download:plugins && \
    rm -rf $THEIA_RUST_APP_PATH/ycache

FROM common

RUN apt-get update -yq \
    && apt-get install -y libsecret-1-0

COPY --from=theia /root/theia_rust_app /root/theia_rust_app

# when creating a container a volume is mapped to /root/rust
# to allow to make persistent changes
ENV RUST_HOME /root/rust
ENV RUSTUP_HOME /root/rust/rustup
ENV CARGO_HOME /root/rust/cargo

# ensure that a custom user who's member of the 'rust' group
# is able to modify CARGO_HOME dir
RUN mkdir -p $RUST_HOME && \
    groupadd -g 500 rust && \
    chown root:rust $RUST_HOME && \
    chmod g+rwxs $RUST_HOME
RUN umask 0002 && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > /tmp/sh.rustup.rs && sh /tmp/sh.rustup.rs -y

ARG rust_channel=nightly

# install language server dependencies for theia
RUN . /root/rust/cargo/env && umask 0002 && rustup toolchain install $rust_channel
RUN . /root/rust/cargo/env && umask 0002 && rustup default $rust_channel

RUN . /root/rust/cargo/env && umask 0002 && rustup component add rust-src rust-docs rls rust-analysis rustfmt clippy
RUN . /root/rust/cargo/env && umask 0002 && cargo +$rust_channel install racer

EXPOSE 3000
ENV SHELL /bin/bash
ENV THEIA_DEFAULT_PLUGINS=local-dir:/root/theia_rust_app/plugins

# script to start theia
ADD run.sh /root/run.sh
# script to set environment
ADD bashrc /root/bashrc
RUN chmod 755 /root \
    && chmod 755 /root/bashrc
WORKDIR $THEIA_RUST_APP_PATH
ENV USER root
CMD [ "bash", "-rcfile", "/root/bashrc", "-i", "/root/run.sh" ]
