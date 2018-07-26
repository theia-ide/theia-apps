# Contributing Theia applications

## Theia Docker

All commands should be run from [theia-docker](theia-docker) folder.

Building the image for Theia tag:

    docker build . -t theiaide/theia:v0.2.1

Running the image:

    docker run -it -p 3000:3000 -v /myproject:/home/project theiaide/theia:v0.2.1

Building the next image:

    docker build --build-arg version=next . -t theiaide/theia:next

Tag the image as latest:

    docker tag theiaide/theia:v0.2.1 theiaide/theia:latest

Running the latest image:

    docker run -p 3000:3000 theiaide/theia

Pushing images to Docker Hub:

    docker login
    docker push theiaide/theia:v0.2.1
    docker push theiaide/theia:latest

Pulling images from Docker Hub:

    docker pull theiaide/theia
    docker pull theiaide/theia:v0.2.1
    docker pull theiaide/theia:next
