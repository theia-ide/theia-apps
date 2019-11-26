# https and token authentication for theia-ide

[theia-ide](https://hub.docker.com/r/theiaide/theia) is a powerful mechanism for remote development in your servers. The problem is that it has no authentication mechanism, so if anyone knows your server and port, your code will be exposed.

This image adds a security layer for the standard image of theia-ide. It adds **token authentication** and a **https** to make your coding sessions more secure. The security is added by means of [gen-http-proxy](https://www.npmjs.com/package/gen-http-proxy), which is a generic http proxy that enables https and token authentication.

## How to use

Run on https://localhost:10443 with the current directory as a workspace (creating a random token):

```console
docker run --init -it -p 10443:10443 -v "$(pwd):/home/project:cached" theiaide/theia-https:latest
generating key file for https
generating cert file for https
root INFO Theia app listening on http://localhost:3000.
redirecting to localhost:3000
access url: https://0.0.0.0:10443?token=0f34fd329f266caca309bd47f8f8cc6f
token: 0f34fd329f266caca309bd47f8f8cc6f
use cookies: true
expiration: 60
```

Run on https://localhost:10443 with the current directory as a workspace and the token "_mysecrettoken_":

```console
docker run --init -it -p 10443:10443 -e token=mysecrettoken -v "$(pwd):/home/project:cached" theiaide/theia-https:latest
generating key file for https
generating cert file for https
root INFO Theia app listening on http://localhost:3000.
redirecting to localhost:3000
access url: https://0.0.0.0:10443?token=mysecrettoken
token: mysecrettoken
use cookies: true
expiration: 60
```

The repository also contains a script called `theiahere` that wraps this command to ease the usage. You are invited to copy it to `/usr/local/bin` to be able to use it from any folder.

## Building your image

This image includes some add-ons to the standard `theia` image. So it adds some layers to a standard theia image. It should be possible to use it to add https and token authentication to _virtually any_ theia docker image (provided that the image makes theia listen at port 3000). 

In order to build the secure image for the standard `theia:latest` docker image, you can simply issue the next command:

```console
$ docker build . -t theiaide/theia-https:latest
```

If you want to change other version (e.g. next), you can pass arguments to the build command:

```console
$ docker build . --build-arg version=next -t theiaide/theia-https:next
```

If you want to add the security layer to other theia app from the `theiaide` dockerhub repository, you can select the app (e.g. theia-go):

```console
$ docker build . --build-arg app=theia-go -t theiaide/theia-go-sec
```

### Customize the security layer

You can customize your server, so that you have a predefined token (instead of generating a random one), disable https, and others. Most of the customization options are provided by means of env variables in **gen-http-proxy**. So you can add commands like `-e secure=0` to your docker run command line for customization.

An example of changing the default port in which listens the secure theia ide is the next:

```
$ docker run -u $(id -u) --rm -it -p 10080:10080 -e server=:10080 -e secure=0 -v $(pwd):/home/project theiaide/theia-https
```

In this case, we are disabling https, but keeping token authentication. Moreover we are listening in port 10080.

Other example:

```
$ docker run -u $(id -u) --rm -it -p 20000:20000 -e server=:20000 -e token=mysecretpassword -v $(pwd):/home/project theiaide/theia-https
```

In this case we are keeping https (enabled by default), but we are using port 20000. Moreover, we set the token to `mysecretpassword`.

You are invited to take a look at the documentation of **gen-http-proxy** at https://github.com/dealfonso/gen-http-proxy or https://www.npmjs.com/package/gen-http-proxy, to know more about customization options.

## Issues

If you have issues, please report them in the repositories:

- repository for **gen-http-proxy** at github: https://github.com/dealfonso/gen-http-proxy
- repository for **theia-ide apps** at github: https://github.com/theia-ide/theia-apps
