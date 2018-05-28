## SADL Web

### Build without caches
```
docker build --no-cache . -t theiaide/sadl:${VERSION}
```

### Run locally
```
docker run -it -p 3000:3000 -v ${LOCAL_FS_PATH_TO_MOUNT}:/home/project theiaide/sadl:${VERSION}
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