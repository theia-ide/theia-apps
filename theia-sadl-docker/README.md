## SADL Web

### Build without caches
```
docker build --no-cache . -t theiaide/sadl:${VERSION}
```

### Run locally on Linux or OS X
```
docker run -it -p 3000:3000 -v "$(pwd):/home/project" theiaide/sadl
```

### Run locally on Windows<sup>[1](#foot-note-1)</sup>
 - CMD.EXE:
   ```
   docker run -it -p 3000:3000 -v "%cd%:/home/project" theiaide/sadl
   ```

 - PowerShell:
   ```
   docker run -it -p 3000:3000 -v "${PWD}:/home/project" theiaide/sadl
   ```

 - Git Bash:
   ```
   winpty docker run -it -p 3000:3000 -v "/$(pwd -W):/home/project" theiaide/sadl
   ```

<a name="foot-note-1">1</a>: Running on Windows requires enabled [Hyper-V](https://en.wikipedia.org/wiki/Hyper-V) on the host environment.


### Push to Docker Hub
```
docker login
docker push theiaide/sadl:${VERSION}
```

### Pull the image from Docker Hub
```
docker pull theiaide/sadl:${VERSION}
```