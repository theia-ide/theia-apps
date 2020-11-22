# .NET Core

A docker container for developing applications and services under .NET Core with [Eclipse Theia Cloud IDE](https://github.com/eclipse-theia/theia).

### Pull the image from Docker Hub

```
docker pull kbarbounakis/theia-dotnet:${VERSION}
```

### Build latest

```bash
docker build . -t kbarbounakis/theia-dotnet
docker build . -t kbarbounakis/theia-dotnet
```

### Build next

```bash
docker build --build-arg version=next . -t kbarbounakis/theia-dotnet:next
```

### Run locally on Linux or OS X

```bash
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" kbarbounakis/theia-dotnet:latest
```
![https://raw.githubusercontent.com/kbarbounakis/theia-apps/master/theia-dotnet-docker/net-core-theia-ide-screenshot.png](https://raw.githubusercontent.com/kbarbounakis/theia-apps/master/theia-dotnet-docker/net-core-theia-ide-screenshot.png)


### Debugging

Configure tasks for building project and create a debug configuration similar to the following:

```
// launch.json
{
  "version": "0.2.0",
  "configurations": [
      {
            "type": "coreclr",
            "request": "launch",
            "program": "${workspaceFolder}/bin/Debug/<target-framework>/<project-name.dll>",
            "cwd": "${workspaceFolder}",
            "args": [],
            "preLaunchTask": "build"
            "name": ".NET Core Launch (console)",
            "env": {
                "ASPNETCORE_ENVIRONMENT": "Development",
                "ASPNETCORE_URLS": "http://0.0.0.0:8080"
            },
            "stopAtEntry": false,
            "console": "internalConsole"
        }
  ]
}
```
