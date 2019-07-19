# Theia Debian Build
A demonstration of how to package the [Theia Cloud IDE](https://github.com/theia-ide/theia) into a debian package for easier distribution, using the [node-deb](https://www.npmjs.com/package/node-deb) module.

This example uses a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/) design to first build and package Theia as a debian package. The debian package is then transferred to a new image to preserve a clean environment. This process is independent of docker and could be replicated in other build environments (i.e. on localhost).

## Quickstart
```console
# build .deb package
> git clone https://github.com/theia-ide/theia-apps.git
> cd theia-apps/theia-deb-build-docker
> docker build -t theia-deb .

# to verify debian installation was successful
> docker run -p 3000:3000 -it theia-deb bash
> theia --help                       # call Theia CLI directly
> theia start --hostname=0.0.0.0     # start Theia
```
