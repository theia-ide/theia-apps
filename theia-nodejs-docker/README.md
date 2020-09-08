# Node.js

A docker container for developing applications and services under node.js with [Eclipse Theia Cloud IDE](https://github.com/eclipse-theia/theia).

### Build latest

```bash
docker build . -t kbarbounakis/theia-nodejs
docker build . -t kbarbounakis/theia-nodejs
```

### Build next

```bash
docker build --build-arg version=next . -t kbarbounakis/theia-nodejs:next
```

### Run locally on Linux or OS X

```bash
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" kbarbounakis/theia-nodejs:latest
```

### Pull the image from Docker Hub

```
docker pull kbarbounakis/theia-nodejs:${VERSION}
```
