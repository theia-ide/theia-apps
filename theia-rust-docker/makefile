.PHONY: get-files rm-files image clean-image run bash push pull

HOST_NAME=$(shell hostname)

REGISTRY=$(HOST_NAME):5000
REGISTRY_REMOTE=localhost:5001
DOCKER_IMAGE = theia_rust_image:latest
DOCKER_CONTAINER = theia_rust_container
BUILD_DIR = build-env

ifeq ($(RUST_CHANNEL),)
RUST_CHANNEL := nightly-2019-11-25
endif

# build the image using the cache
image:
	docker build --build-arg rust_channel=$(RUST_CHANNEL) -t $(DOCKER_IMAGE) .

# This empty directory '$(BUILD_DIR)' exists in git, with only an .gitignore file, set to ignore the entire contents of the dir.
# This helps to avoid committing files in that dir to git.
rm-files:
	cd $(BUILD_DIR) && \
	find . ! -name '.gitignore' -type f -exec rm -f {} + && \
	find . ! -name '.gitignore' -type d -exec rm -rf {} + > /dev/null 2>&1 ; \
	exit 0

get-files: rm-files
    # Add these archived files from external sources to the current directory.
    # Docker will automatically extract them, during image building, with the ADD command.
	echo "none required"

clean-image: rm-files get-files
	docker build --no-cache --build-arg rust_channel=${RUST_CHANNEL} -t $(DOCKER_IMAGE) .


# push in a local registry
push:
	docker tag ${DOCKER_IMAGE} ${REGISTRY}/${DOCKER_IMAGE}
	docker push ${REGISTRY}/${DOCKER_IMAGE}

# pull from a registry
pull:
	docker pull ${REGISTRY}/${DOCKER_IMAGE}
	docker tag ${REGISTRY}/${DOCKER_IMAGE} ${DOCKER_IMAGE}

# transfer from remote registry into local registry
transfer_remote:
	docker pull ${REGISTRY_REMOTE}/${DOCKER_IMAGE}
	docker tag ${REGISTRY_REMOTE}/${DOCKER_IMAGE} ${DOCKER_IMAGE}
