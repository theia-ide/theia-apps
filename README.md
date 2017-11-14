# Theia applications

## Theia Docker

All commands should be run from [theia-docker](theia-docker) folder.

Building the image for Theia tag:

    docker build . -t typefox/theia:v0.2.1

Running the image:

    docker run -p 3000:3000 typefox/theia:v0.2.1

Building the next image:

    docker build --build-arg version=next . -t typefox/theia:next

Tag the image as latest:

    docker tag typefox/theia:v0.2.1 typefox/theia:latest

Running the latest image:

    docker run -p 3000:3000 typefox/theia

Pushing images to Docker Hub:

    docker login
    docker push typefox/theia:v0.2.1
    docker push typefox/theia:latest

Pulling images from Docker Hub:

    docker pull typefox/theia
    docker pull typefox/theia:v0.2.1
    docker pull typefox/theia:next

## Theia Desktop

TBD

## License

[Apache 2.0](LICENSE)