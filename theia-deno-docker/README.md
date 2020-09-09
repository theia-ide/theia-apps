# Deno

A docker container for developing applications and services under Deno with [Eclipse Theia Cloud IDE](https://github.com/eclipse-theia/theia).

![https://raw.githubusercontent.com/kbarbounakis/theia-apps/master/theia-deno-docker/theia-deno-screenshot.png](https://raw.githubusercontent.com/kbarbounakis/theia-apps/master/theia-deno-docker/theia-deno-screenshot.png)

### Build latest

```bash
docker build . -t kbarbounakis/theia-deno
docker build . -t kbarbounakis/theia-deno
```

### Build next

```bash
docker build --build-arg version=next . -t kbarbounakis/theia-deno:next
```

### Run locally on Linux or OS X

```bash
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" kbarbounakis/theia-deno:latest
```

### Pull the image from Docker Hub

```
docker pull kbarbounakis/theia-deno:${VERSION}
```
