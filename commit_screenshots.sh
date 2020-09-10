#!/bin/bash
# Copyright 2019 D.W.J. Bosman
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#      http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# 

set -e # Exit with a non zero exit code when a command fails

SOURCE_BRANCH="master"
# the screenshots will be committed in this branch
TARGET_BRANCH="bugs"

# Add the GH_TOKEN to the url so that travis is able to commit
REPO=`git config remote.origin.url`
AUTH_REPO=${REPO/https:\/\/github.com\//https://${GH_TOKEN}@github.com/}
SHA=`git rev-parse --verify HEAD`

git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git fetch --depth 1 origin $TARGET_BRANCH:$TARGET_BRANCH
git checkout $TARGET_BRANCH

# Empty the branch, ignore error if already empty
git rm -r . || true

# Add all png files
find . -name '*.png' | xargs git add

# If Git indicates that there are no changes, the script will exit without committing.
if git diff --staged --quiet; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit
git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
git remote add origin-results ${AUTH_REPO} > /dev/null 2>&1
git push --quiet --set-upstream origin-results $TARGET_BRANCH
