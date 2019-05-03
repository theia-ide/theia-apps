# Haskell

### Caveat

You need at least 2GB of memory to build this image (4 is preferable). Otherwise you will get error [`returned a non-zero code: 137`](https://success.docker.com/article/what-causes-a-container-to-exit-with-code-137), which means that process got killed by [OOM killer](https://linux-mm.org/OOM_Killer).

### Build latest

```bash
docker build . -t theiaide/theia-haskell:0.3.12
docker build . -t theiaide/theia-haskell:latest
```

### Build next

```bash
docker build --build-arg version=next . -t theiaide/theia-haskell:next
```

### Run locally on Linux or OS X

```bash
docker run -it -p 3000:3000 -v "$(pwd):/home/project" theiaide/theia-haskell:latest
```

### Push to Docker Hub

```bash
docker login
docker push theiaide/theia-haskell:${VERSION}
```

### Pull the image from Docker Hub

```
docker pull theiaide/theia-haskell:${VERSION}
```
