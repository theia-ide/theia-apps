# Theia applications
[![Build Status](https://travis-ci.org/theia-ide/theia-apps.svg?branch=master)](https://travis-ci.org/theia-ide/theia-apps)

[Theia](https://github.com/theia-ide/theia) is a platform to develop Cloud & Desktop IDEs with modern web technologies.

This repo contains example Theia applications based on published Theia extension packages.

- [Theia Docker](#theia-docker)
  - [How to use `theiaide/theia` image?](#how-to-use-typefoxtheia-image)
  - [Image Variants](#image-variants)
    - [`theiaide/theia:latest`](#typefoxtheialatest)
    - [`theiaide/theia:<version>`](#typefoxtheiaversion)
    - [`theiaide/theia:next`](#typefoxtheianext)
    - [`theiaide/theia:<version>-next.<commit hash>`](#typefoxtheiaversion-nextcommit-hash)
- [Theia Desktop](#theia-desktop)
- [Contributing](CONTRIBUTING.md)
- [License](#license)

## Theia Docker

[![dockeri.co](http://dockeri.co/image/theiaide/theia)](https://hub.docker.com/r/theiaide/theia/)

`theiaide/theia` image contains an example of Theia based IDE for Web Developers.

### How to use `theiaide/theia` image?

At the moment Theia is still in [the active development](https://github.com/theia-ide/theia#roadmap). It is recomended to use [`theiaide/theia:next`](#typefoxtheianext) image to have a look at the current state.

This script pulls the image and runs Theia IDE on http://localhost:3000 with the current directory as a workspace.

    docker pull theiaide/theia:next
    docker run -it -p 3000:3000 -v "$(pwd):/home/project:cached" theiaide/theia:next

You can pass additional arguments to Theia after the image name, for example to enable debugging:

    docker run -it -p 3000:3000 --expose 9229 -p 9229:9229 -v "$(pwd):/home/project:cached" theiaide/theia:next --inspect=0.0.0.0:9229

### Image Variants

#### `theiaide/theia:latest`

This image is based on the latest stable released version.

#### `theiaide/theia:<version>`

This image is based on the given stable released version.

#### `theiaide/theia:next`

This image is based on the nightly published version.

#### `theiaide/theia:<version>-next.<commit hash>`

This image is based on the given nightly published version.

## Theia Desktop

TBD

## License

[Apache 2.0](LICENSE)
