## Theia Go Docker

Run on http://localhost:3000 with the current directory as a workspace:

```bash
docker run --security-opt seccomp=unconfined -e GO111MODULE=auto -it -p 3000:3000 -v "$(pwd):/home/project:cached" theiaide/theia-go:next
```
**IMPORTANT**: if your host OS is different from image OS (linux-amd64) then don't mount but pull (`go get`) the project from the container to install dependencies against image OS, otherwise Go tooling won't work properly

Options:
- `--security-opt seccomp=unconfined` enables running without [the default seccomp profile](https://docs.docker.com/engine/security/seccomp/) to allow Go debugging
- `-e GO111MODULE=auto` controls [Go module support](https://github.com/golang/go/wiki/Modules#when-do-i-get-old-behavior-vs-new-module-based-behavior)
