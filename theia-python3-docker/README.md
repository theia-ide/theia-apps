# Python 3

### Build latest

```bash
docker build . -t theiaide/theia-python33:0.3.12
docker build . -t theiaide/theia-python33:latest
```

### Build next

```bash
docker build --build-arg version=next . -t theiaide/theia-python33:next
```

### Run locally on Linux or OS X

```bash
docker run -it -p 3000:3000 -v "$(pwd):/home/project" theiaide/theia-python3:latest
```

### Push to Docker Hub

```bash
docker login
docker push theiaide/theia-python3:${VERSION}
```

### Pull the image from Docker Hub

```
docker pull theiaide/theia-python3:${VERSION}
```