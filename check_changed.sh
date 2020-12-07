#!/bin/bash
set -e
# This script is called by GH Workflows before the install step.
# It echoes 137 if no files where changed. In that case
# no further building/test is required for this image

IMAGE_NAME=$1

CHANGED_FILES=$(git diff --name-status origin/master "$IMAGE_NAME-docker")

if [ "$IMAGE_NAME" == "theia" ]
then
    if [ -z "$CHANGED_FILES" ]
    then
        # there were no changes in theia-docker

        # we want to build the theia-docker image also
        # in the case that there were changes in other
        # non theia*-docker folders
        # eg. build scripts

        CHANGED_FILES_NON_DOCKER=$(git diff --name-status origin/master .)
        while read -r line; do
            # the output of the git diff is of the form "M    theia-somename-docker/xyz"
            if [[ $line =~ ^[[:space:]]*.[[:space:]]+theia(.)*-docker(.)+ ]]; then
                # there was a change to an theia*-docker folder (not theia-docker)
                # this will be picked up by another build
                :
            else
                # there was a change in a non theia*-docker folder
                # build theia-docker to be sure no utility scripts are broken
                CHANGED_FILES="$line"$'\n'"$CHANGED_FILES"
            fi
        done <<< "$CHANGED_FILES_NON_DOCKER"

    fi
fi


if [ -z "$CHANGED_FILES" ]
then
    # nothing changed, skip building
    # this indicates to the parent script that the build can be terminated
    echo 137
else
    echo 0
fi
