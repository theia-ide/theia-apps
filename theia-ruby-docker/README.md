# Python

### Build latest

```bash
docker build . -t theiaide/theia-python:0.3.12
docker build . -t theiaide/theia-python:latest
```

### Build next

```bash
docker build --build-arg version=next . -t theiaide/theia-python:next
```

### Run locally on Linux or OS X

```bash
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" theiaide/theia-python:latest
```

### Push to Docker Hub

```bash
docker login
docker push theiaide/theia-python:${VERSION}
```

### Pull the image from Docker Hub

```
docker pull theiaide/theia-python:${VERSION}
```
