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

cd "$IMAGE_NAME-docker"

CHANGED_FILES=$(git diff --name-status HEAD~1...HEAD .)
if [ -z "$CHANGED_FILES" ]
then
    # nothing changed, skip building
    echo "No changes in $IMAGE_NAME, terminate"
   
    # this indicates to the parent script that the build can be terminated
    exit 137
fi

echo "There were changes in $IMAGE_NAME changes: $CHANGED_FILES"
exit 0
