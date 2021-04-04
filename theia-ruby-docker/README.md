# Ruby 

### Build latest

```bash
docker build . -t theiaide/theia-ruby:0.3.12
docker build . -t theiaide/theia-ruby:latest
```

### Build next

```bash
docker build --build-arg version=next . -t theiaide/theia-ruby:next
```

### Run locally on Linux or OS X

```bash
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" theiaide/theia-ruby:latest
```

### Push to Docker Hub

```bash
docker login
docker push theiaide/theia-ruby:${VERSION}
```

### Pull the image from Docker Hub

```
docker pull theiaide/theia-ruby:${VERSION}
```
