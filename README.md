<!-- Main Header  -->
<div align='center'>

<img src="./assets/theia.svg" width="125px">

## Eclipse Theia Applications - Docker & Electron

[![Build Status](https://travis-ci.org/theia-ide/theia-apps.svg?branch=master)](https://travis-ci.org/theia-ide/theia-apps)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-curved)](https://github.com/theia-ide/theia-apps/labels/help%20wanted)
[![Questions](https://img.shields.io/badge/Questions-blue.svg?style=flat-curved)](https://github.com/theia-ide/theia-apps/issues?utf8=%E2%9C%93&q=label%3Aquestion+)

Collection of example cloud & desktop applications built using the [Theia](https://github.com/eclipse-theia/theia) platform.

</div>

---

<br />

### Outline

- [Overview](#overview)
- [Docker Image Variants](#docker-image-variants)
- [Additional Docker Examples](#additional-docker-examples)
    - [How to use `theiaide/theia` image](#how-to-use-theiaidetheia-image)
- [Electron Applications](#electron-apps)
- [Running & Debugging](#running-&-debugging)
- [Tips & Tricks](#tips-&-tricks)
    - [Build Options](#build-options)
- [Contributing](#contributing)
- [License](#license)

<br />

### Overview

This repository contains a collection of Theia-based IDE applications (both electron desktop apps and docker images) as examples, for demo and continuous-integration purposes.

### Docker Image Variants

<img
    src='./assets/docker.png'
    alt='docker logo'
    width="125px"
/>

| Image Name | Description | Documentation |
|:---|:---|:---|
| [theiaide/theia](https://hub.docker.com/r/theiaide/theia) | Theia-based JavaScript/TypeScript (Web Technologies) example application | |

_Other Variants_:

| Image Name | Description | Documentation |
|:---|:---|:---|
| [theiaide/theia-cpp](https://hub.docker.com/r/theiaide/theia-cpp) | Theia-based C/C++ example application | [docs](./theia-cpp-docker/README.md) |
| [theiaide/theia-dart](https://hub.docker.com/r/theiaide/theia-dart) | Theia-based Dart example application | |
| [theiaide/theia-full](https://hub.docker.com/r/theiaide/theia-full) | Theia-based example application with support for multiple languages | |
| [theiaide/theia-go](https://hub.docker.com/r/theiaide/theia-go) | Theia-based Go example application | [docs](./theia-go-docker/README.md) |
| [theiaide/theia-python](https://hub.docker.com/r/theiaide/theia-python) | Theia-based Python example application | [docs](./theia-python-docker/README.md) |
| [theiaide/theia-php](https://hub.docker.com/r/theiaide/theia-php) | Theia-based PHP example application | [docs](./theia-php-docker/README.md) |
| [theiaide/theia-rust](https://hub.docker.com/r/theiaide/theia-rust) | Theia-based Rust example application | [docs](./theia-rust-docker/README.md) |
| [theiaide/theia-swift](https://hub.docker.com/r/theiaide/theia-swift) | Theia-based Swift example application | |

---

<br />

### Additional Docker Examples

| Image Name | Description | Documentation |
|:---|:---|:---|
| `theia-deb-build-docker` | Example on how to package the IDE into a Debian package | [docs](./theia-deb-build-docker/README.md) |
| `theia-https-docker` | Example on how to add security layer over existing images | [docs](./theia-https-docker/README.md) |
| `theia-openshift-docker` | Example image for OpenShift | |
| `theia-rpm-build-docker` | Example on how to package the IDE into an RPM (for RHEL/CentOS) | [docs](./theia-rpm-build-docker/README.md) |

<br />

### How to use `theiaide/theia` image?

Theia is actively being developed. It is recommended to use `theiaide/theia:latest` if you want the latest stable release of Theia or `theiaide/theia:next` if you want the most recent version of Theia at the time the image was built (bleeding edge).

The following pulls the image and runs Theia IDE on http://localhost:3000 with the current directory as a workspace. The option of `--init` is added to fix the [defunct process problem](https://github.com/theia-ide/theia-apps/issues/195).

    # Linux, macOS, or PowerShell
    docker run -it --init -p 3000:3000 -v "$(pwd):/home/project:cached" theiaide/theia:next

    # Windows (cmd.exe)
    docker run -it --init -p 3000:3000 -v "%cd%:/home/project:cached" theiaide/theia:next


You can pass additional arguments to Theia after the image name, for example to enable debugging:

    # Linux, macOS, or PowerShell
    docker run -it --init -p 3000:3000 --expose 9229 -p 9229:9229 -v "$(pwd):/home/project:cached" theiaide/theia:next --inspect=0.0.0.0:9229

    # Windows (cmd.exe)
    docker run -it --init -p 3000:3000 --expose 9229 -p 9229:9229 -v "%cd%:/home/project:cached" theiaide/theia:next --inspect=0.0.0.0:9229

### Electron Apps

The repository contains example Electron applications which are packaged using `electron-builder`. Following the steps provided in their respective README, it is possible to build and package the applications for Desktop use.

<img
    src='./assets/electron.png'
    alt='electron logo'
    width="50px"
/>

| Application Name | Description | Documentation |
|:---|:---|:---|
| `theia-cpp-electron` | Theia-based C/C++ desktop IDE | [docs](./theia-cpp-electron/README.md) |
| `theia-electron` | Theia-based JavaScript/TypeScript (Web Technologies) desktop IDE | [docs](./theia-electron/README.md) |

---

<br />

## VS Code Extensions

Many applications in the repository now include support for running VS Code extensions, and an integration to the public instance of [open-vsx registry](https://open-vsx.org/), an open alternative to the Visual Studio Marketplace. The `Extensions` view can be opened through the `Views` top-level menu when starting the application.

## Tips & Tricks

- #### Build Options:
    - `--init` injects an instance of [tini](https://github.com/krallin/tini) in the container, that will wait-for and reap terminated processes, to avoid leaking PIDs.
    - `--security-opt seccomp=unconfined` enables running without [the default seccomp profile](https://docs.docker.com/engine/security/seccomp/) for debugging. This option is also required if the swift REPL is needed.

## Contributing

[Contributing](CONTRIBUTING.md)

## License

[Apache 2.0](LICENSE)
