ARG version=latest
ARG app=theia
FROM theiaide/$app:$version

# We need to add openssl to be able to create the certificates on demand
USER root
RUN (apk update 2> /dev/null && apk add openssl) || (apt-get update 2> /dev/null && apt-get install -y openssl) || (yum install openssl)
RUN npm install -g gen-http-proxy
USER theia

# Add our script
ADD ssl_theia.sh /home/theia/ssl/

ARG LISTEN_PORT=10443

# Set the parameters for the gen-http-proxy
ENV staticfolder /usr/local/lib/node_modules/gen-http-proxy/static 
ENV server :$LISTEN_PORT
ENV target localhost:3000
ENV secure 1 

# Run theia and accept theia parameters
ENTRYPOINT [ "/home/theia/ssl/ssl_theia.sh" ]
