# All Languages - Also includes dotnet cli

### Build latest

```bash
docker build . -t theiaide/theia-full-dotnet:latest
```

### Build next

```bash
docker build --build-arg version=next . -t theiaide/theia-full-dotnet:next
```

### Run locally on Linux or OS X

```bash
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" theiaide/theia-full-dotnet:latest
```
