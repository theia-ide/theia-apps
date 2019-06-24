# Theia with Rust support

## Building the image

<pre>
cd [this repo]/theia-rust-docker
RUST_CHANNEL=nightly make image
</pre>

## Start Theia

1. cd to a folder in your home dir.

eg. cd to the example\_workspace folder.
  
2. Start editor

<pre>[path to theia-apps]/theia-rust-docker/ex_theia</pre>

This creates a container and mounts your home dir. It creates a user inside the container with matching UID/GID so that you can edit files without corrupting permissions. A volume rust-cargo-vol is created in which the rust environment is stored. This will allow you to persistently install crates etc. across container life cycles.

## Bash inside the container

3. Start a bash within the container

<pre>[path to theia-apps]/theia-rust-docker/ex_bash</pre>

4. Run a single command in the container

You can run a single command in side the container:

<pre>[path to theia-apps]/theia-rust-docker/ex_bash "...command..."</pre>

eg.

<pre>ex_bash "cargo --list"</pre>

## Example project

A very simple rust example project is included in the example_project folder. It contains a build task and debug configuration which uses rust-gdb.

## How does it work?

The ex\* scripts check if a container exists and if so reuses it. If not, the container is created. A command is ran inside the container to create a user corresponding to the user calling the ex script. If ex_theia is ran, the bashrc script is sourced after which the run.sh script is ran inside the container. The bashrc script changes the dir to the same location from which the ex script was ran (via the CONTAINER_START_PATH environment variable). This is done only if the current path is within the users mounted HOME dir. Next the bashrc script sources nvm_setup.sh which activates a specific node version and adds yarn to the path. Lastly it sets up the rust build environment through RUSTUP_HOME and CARGO_HOME. Once the environent is sourced the run.sh script can actually start Theia.
