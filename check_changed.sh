#!/bin/bash
set -e
# This script is called by Travis during the install step.
# It returns 1 if no files where changed. In that case
# no further building/test is required for this image

IMAGE_NAME=$1

echo "Travis event type: $TRAVIS_EVENT_TYPE"

if [ "$TRAVIS_EVENT_TYPE" != "pull_request" ]
then
    # trigger via travis dashboard or cron job
    # test all
    echo "Trigger all tests"
    exit 0
fi


CHANGED_FILES=$(git diff --name-status HEAD~1...HEAD "$IMAGE_NAME-docker")


if [ "$IMAGE_NAME" == "theia" ]
then
    if [ -z "$CHANGED_FILES" ]
    then
        # there were no changes in theia-docker
        
        # we want to build the theia-docker image also
        # in the case that there were changes in other
        # non theia*-docker folders
        # eg. build scripts
    
        CHANGED_FILES_NON_DOCKER=$(git diff --name-status HEAD~1...HEAD .)
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
    echo "No changes in $IMAGE_NAME, terminate"
   
    # this indicates to the parent script that the build can be terminated
    exit 137
fi

echo "There were changes in $IMAGE_NAME changes: $CHANGED_FILES"
exit 0
