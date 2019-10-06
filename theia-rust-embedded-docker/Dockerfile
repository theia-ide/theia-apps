# Can't use node image, because it creates a user that conflicts
FROM ubuntu:18.04

RUN apt-get update -yq \
    && apt-get install -yq \
    curl gnupg build-essential gcc g++ gdb make python sudo git \
    # for building openocd
    libtool autotools-dev automake pkg-config \
    # for openocde stlink 
    libusb-1.0-0-dev \
    # for embedded dev
    gdb-multiarch qemu-system-arm \
    # for cargo-generate
    libssl1.0-dev 
# allow a user to become root in the container
ADD sudoers /etc/sudoers

ARG GITHUB_TOKEN
ARG NODE_OPTIONS="--max-old-space-size=4096"
ARG NODE_VERSION=10

ADD install_node.sh /root/install_node.sh
RUN bash /root/install_node.sh --version $NODE_VERSION
ADD nvm_setup.sh /root/nvm_setup.sh

# install theia
ENV THEIA_RUST_APP_PATH /root/theia_rust_app
RUN mkdir $THEIA_RUST_APP_PATH
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn global add node-gyp
ADD next.package.json $THEIA_RUST_APP_PATH/package.json
# needed for ext-scripts which is not in npm
# note 1. that cpp-debug is installed from npm and not from this local copy
# note 2. cortex-debug is not used from this repo, rather the vscode plugin is used.
RUN git clone https://github.com/eclipse-theia/theia-cpp-extensions.git /root/theia-cpp-extension
RUN mkdir $THEIA_RUST_APP_PATH/packages
RUN cp -Rv /root/theia-cpp-extension/dev-packages/* $THEIA_RUST_APP_PATH/packages/.
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn --cache-folder $THEIA_RUST_APP_PATH/ycache 
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn theia build

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

ARG rust_channel=nightly-2019-08-01

# install language server dependencies for theia
RUN . /root/rust/cargo/env && umask 0002 && rustup toolchain install $rust_channel
RUN . /root/rust/cargo/env && umask 0002 && rustup default $rust_channel

RUN . /root/rust/cargo/env && umask 0002 && rustup component add rust-src rust-docs rls rust-analysis rustfmt clippy llvm-tools-preview
RUN . /root/rust/cargo/env && umask 0002 && cargo +$rust_channel install racer

RUN . /root/rust/cargo/env && umask 0002 && rustup target add thumbv6m-none-eabi
RUN . /root/rust/cargo/env && umask 0002 && rustup target add thumbv7m-none-eabi
RUN . /root/rust/cargo/env && umask 0002 && rustup target add thumbv7em-none-eabi
RUN . /root/rust/cargo/env && umask 0002 && rustup target add thumbv7em-none-eabihf
RUN . /root/rust/cargo/env && umask 0002 && cargo +$rust_channel install cargo-binutils
RUN . /root/rust/cargo/env && umask 0002 && cargo +$rust_channel install cargo-generate

# install openocd from source	
RUN git clone git://repo.or.cz/openocd.git /root/openocd
RUN cd /root/openocd && ./bootstrap && ./configure --enable-stlink && make && make install

EXPOSE 3000
ENV SHELL /bin/bash
# script to start theia
ADD run.sh /root/run.sh
# script to set environment
ADD bashrc /root/bashrc
RUN chmod 755 /root \
    && chmod 755 /root/bashrc
WORKDIR $THEIA_RUST_APP_PATH
ENV USER root
CMD [ "bash", "-rcfile", "/root/bashrc", "-i", "/root/run.sh" ]

