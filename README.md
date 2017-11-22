# Theia applications
[![Build Status](https://travis-ci.org/theia-ide/theia-apps.svg?branch=master)](https://travis-ci.org/theia-ide/theia-apps)

[Theia](https://github.com/theia-ide/theia) is a platform to develop Cloud & Desktop IDEs with modern web technologies.

This repo contains example Theia applications based on published Theia extension packages.

- [Theia Docker](#theia-docker)
  - [How to use `typefox/theia` image?](#how-to-use-typefoxtheia-image)
  - [Image Variants](#image-variants)
    - [`typefox/theia:latest`](#typefoxtheialatest)
    - [`typefox/theia:<version>`](#typefoxtheiaversion)
    - [`typefox/theia:next`](#typefoxtheianext)
    - [`typefox/theia:<version>-next.<commit hash>`](#typefoxtheiaversion-nextcommit-hash)
- [Theia Desktop](#theia-desktop)
- [Contributing](CONTRIBUTING.md)
- [License](#license)

## Theia Docker

[![dockeri.co](http://dockeri.co/image/typefox/theia)](https://hub.docker.com/r/typefox/theia/)

`typefox/theia` image contains an example of Theia based IDE for Web Developers.

### How to use `typefox/theia` image?

At the moment Theia is still in [the active development](https://github.com/theia-ide/theia#roadmap). It is recomended to use [`typefox/theia:next`](#typefoxtheianext) image to have a look at the current state.

This script pulls the image and runs Theia IDE on http://localhost:3000 with the current directory as a workspace.

    docker pull typefox/theia:next
    docker run -it -p 3000:3000 -v "$(pwd):/home/project" typefox/theia:next

### Image Variants

#### `typefox/theia:latest`

This image is based on the latest stable released version.

#### `typefox/theia:<version>`

This image is based on the given stable released version.

#### `typefox/theia:next`

This image is based on the nightly published version.

#### `typefox/theia:<version>-next.<commit hash>`

This image is based on the given nightly published version.

## Theia Desktop

TBD

## License

[Apache 2.0](LICENSE)
