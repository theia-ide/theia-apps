# Theia RPM Build
A demonstration of how to package the [Theia Cloud IDE](https://github.com/theia-ide/theia) into an RPM for easier distribution, using the [speculate](https://www.npmjs.com/package/speculate) module.

This example uses a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/) design to first build and package Theia into an rpm. The rpm is then transferred to a new image to preserve a clean environment. This process is independent of docker and could be replicated in other build environments (i.e. on localhost).

## Quickstart
```console
# build rpm
> git clone https://github.com/theia-ide/theia-apps.git
> cd theia-apps/theia-rpm-build-docker
> docker build -t theia-rpm .

# to verify RPM installation was successful
> docker run -p 3000:3000 -it theia-rpm bash
> theia --help                       # call Theia CLI directly
> theia start --hostname=0.0.0.0     # start Theia
```

