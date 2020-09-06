# Deno

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
