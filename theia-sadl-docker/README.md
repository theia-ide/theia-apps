## SADL Web

### Build without caches
```
docker build --no-cache . -t theiaide/sadl:${VERSION}
```

### Run locally on Linux or OS X
```
docker run -it -p 3000:3000 -v ${LOCAL_FS_PATH_TO_MOUNT}:/home/project theiaide/sadl:${VERSION}
```

### Run locally on Windows
This requires enabled [Hyper-V](https://en.wikipedia.org/wiki/Hyper-V) on the host environment and execution from [Git Bash](https://gitforwindows.org).
```
winpty docker run -it -p 3000:3000 -v /${LOCAL_FS_PATH_TO_MOUNT}:/home/project theiaide/sadl:${VERSION}
```

### Push to Docker Hub
```
docker login
docker push theiaide/sadl:${VERSION}
```

### Pull the image from Docker Hub
```
docker pull theiaide/sadl:${VERSION}
```