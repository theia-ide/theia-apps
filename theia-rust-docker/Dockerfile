#Can't use node image, because it creates a user that conflicts
FROM ubuntu:18.04

RUN apt-get update -yq \
    && apt-get install curl gnupg build-essential gcc g++ gdb make python sudo git -yq 

#allow a user to become root in the container
ADD sudoers /etc/sudoers

ARG GITHUB_TOKEN
ARG NODE_OPTIONS="--max-old-space-size=4096"
ARG NODE_VERSION=10

ADD install_node.sh /root/install_node.sh
RUN bash /root/install_node.sh --version $NODE_VERSION
ADD nvm_setup.sh /root/nvm_setup.sh

#install theia
ENV THEIA_RUST_APP_PATH /root/theia_rust_app
RUN mkdir $THEIA_RUST_APP_PATH
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn global add node-gyp
ADD next.package.json $THEIA_RUST_APP_PATH/package.json
RUN git clone https://github.com/eclipse/theia-cpp-extension.git /root/theia-cpp-extension
RUN cp -R /root/theia-cpp-extension/packages $THEIA_RUST_APP_PATH/.
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn --cache-folder $THEIA_RUST_APP_PATH/ycache 
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH/packages/cpp-debug && yarn --cache-folder $THEIA_RUST_APP_PATH/ycache 
RUN . /root/nvm_setup.sh && cd $THEIA_RUST_APP_PATH && yarn theia build

# when creating a container a volume is mapped to /root/rust
# to allow to make persistent changes
ARG rust_channel=nightly-2019-07-19

ENV RUSTUP_HOME /root/rust/rustup
ENV CARGO_HOME /root/rust/cargo

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > /tmp/sh.rustup.rs && sh /tmp/sh.rustup.rs -y

#install language server dependencies for theia
RUN . /root/rust/cargo/env && rustup toolchain install $rust_channel
RUN . /root/rust/cargo/env && rustup default $rust_channel
RUN . /root/rust/cargo/env && rustup component add rust-src rust-docs rls rust-analysis rustfmt clippy


RUN . /root/rust/cargo/env && cargo +$rust_channel install racer

EXPOSE 3000
ENV SHELL /bin/bash
# script to start theia
ADD run.sh /root/run.sh
# script to set environment
ADD bashrc /root/bashrc
RUN chmod 755 /root \
    && chmod 755 /root/bashrc
WORKDIR $THEIA_RUST_APP_PATH
CMD [ "bash", "-rcfile", "/root/bashrc","-i","/root/run.sh" ]

