# Python

### Build latest

```bash
docker build . -t theia-python:latest
```

### Build next

```bash
docker build --build-arg version=next . -t theia-python:next
```

### Run locally on Linux or OS X

```bash
docker run -it -p 3000:3000 -v "$(pwd):/home/project" theia-python:latest
```
