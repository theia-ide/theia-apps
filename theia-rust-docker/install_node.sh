#!/bin/sh

# Install node and npm via nvm - https://github.com/creationix/nvm

# Run this script like - bash script-name.sh

# Define versions
INSTALL_NODE_VER=10
INSTALL_NVM_VER=0.34.0

# You can pass argument to this script --version 8
if [ "$1" = '--version' ]; then
	echo "==> Using specified node version - $2"
	INSTALL_NODE_VER=$2
fi

# don't let nvm change bashrc
cp ~/.bashrc ~/.bashrc_backup

echo "==> Installing node version manager version $INSTALL_NVM_VER"
# Removed if already installed
rm -rf ~/.nvm
# Unset exported variable
export NVM_DIR=

# Install nvm 
curl -o- https://raw.githubusercontent.com/creationix/nvm/v$INSTALL_NVM_VER/install.sh | bash
# Make nvm command available to terminal
source ~/.nvm/nvm.sh

echo "==> Installing node js version $INSTALL_NODE_VER"
nvm install $INSTALL_NODE_VER

echo "==> Make this version system default"
nvm alias default $INSTALL_NODE_VER
nvm use default

echo "==> Installing Yarn package manager"
rm -rf ~/.yarn
curl -o- -L https://yarnpkg.com/install.sh | bash
# Yarn configurations
export PATH="$HOME/.yarn/bin:$PATH"
yarn config set prefix ~/.yarn -g

echo "==> Checking for versions"
nvm --version
node --version
npm --version
yarn --version

echo "==> Print binary paths"
which npm
which node
which yarn

echo "==> List installed node versions"
nvm ls

nvm cache clear
echo "==> Please Logout and Login back to take changes effect"

# don't let nvm change bashrc
cp ~/.bashrc_backup ~/.bashrc
rm ~/.bashrc_backup

# Tested on Ubuntu, MacOS
