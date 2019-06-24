if [ -n "$NVM_DIR" ]; then 
    # already setup
    exit 0
fi

export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export PATH="/root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH"

