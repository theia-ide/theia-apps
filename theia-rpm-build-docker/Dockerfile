FROM centos:7
# install development tools
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash - && \
    yum groupinstall -y "Development Tools" && \
    yum install -y nodejs && \
    npm install -g yarn

# required file to install Theia
COPY package.json run_theia.sh /theia-app/

# build theia
WORKDIR /theia-app
RUN yarn && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean

# create theia rpm
RUN npm run build-rpm

# transfer rpm to new clean image and demonstrate successful rpm install (yum will handle all rpm dependencies i.e. Node v10)
FROM centos:7
COPY --from=0 /root/rpmbuild/RPMS/x86_64/theia-0.0.1-1.x86_64.rpm /
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash - && \
    yum install -y theia-0.0.1-1.x86_64.rpm && \
    rm -f theia-0.0.1-1.x86_64.rpm

ENV SHELL /bin/bash
EXPOSE 3000
CMD ["theia","start","--hostname=0.0.0.0"]
