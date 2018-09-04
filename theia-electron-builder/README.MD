## theia-electron-builder

Docker image that can produce electron-based Theia applications for Windows on UNIX.

### Pull
```
docker pull theiaide/theia-electron-builder
```

### Build
```
docker build --no-cache . -t theiaide/theia-electron-builder:${VERSION}
```

### Tag
```
docker tag theiaide/theia-electron-builder:${VERSION} theiaide/theia-electron-builder:latest \
&& docker push theiaide/theia-electron-builder:latest
```

### Publish
```
docker push theiaide/theia-electron-builder:latest
```