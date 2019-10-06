# Theia with Rust support

## Building the image

<pre>
cd [this repo]/theia-rust-docker
make image
</pre>

By default Rust channel "nightly-2019-08-01" is used (it contains a.o. the required rls component). You can specify which Rust channel is used. Eg.

<pre>
cd [this repo]/theia-rust-docker
RUST_CHANNEL=nightly-2019-08-01 make image
</pre>


The 'image' target makes use of the Docker cache to speedup building. It's possible to build the image from scratch:
<pre>
cd [this repo]/theia-rust-docker
make clean-image
</pre>

## Docker configuration

To use this image you must run the docker deamon with ipv6 support (otherwise the Theia cortex-debug plugin will not work correctly). You could add the following to the /etc/docker/daemon.json file:
<pre>
    ....
    "ipv6": true,
    "fixed-cidr-v6": "2001:db8:1::/64",
    ...
</pre>

## Start Theia

1. cd to a folder in your home dir.

eg. cd to the example\_workspace folder.
  
2. Start editor

<pre>[path to theia-apps]/theia-rust-docker/ex_theia</pre>

This creates a container and mounts your home dir. It creates a user inside the container with matching UID/GID so that you can edit files without corrupting permissions. A volume rust-embedded-cargo-vol is created in which the rust environment is stored. This will allow you to persistently install crates etc. across container life cycles.

## Bash inside the container

3. Start a bash within the container

<pre>[path to theia-apps]/theia-rust-docker/ex_bash</pre>

4. Run a single command in the container

You can run a single command in side the container:

<pre>[path to theia-apps]/theia-rust-docker/ex_bash "...command..."</pre>

eg.

<pre>ex_bash "cargo --list"</pre>

## Persistent changes of Rust environment

When the container is started a named Docker volume is created. This volume stores the Rustup and Cargo folders. You can install libraries etc., these changes will be kept even if you delete your container. If you mess up the Rust environment you can reset the environment by issueing:

<pre>
docker volume rm rust-cargo-vol
</pre>

## Example project

A very simple rust example project is included in the example_embedded folder. It contains a build task and debug configurations. I'm using a STM32L152c-discovery board. This board contains a cortex-m3 ARM processor. The [embedded Rust book](https://rust-embedded.github.io/book/) was used as inpsiration.

### Using QEMU

  1. Update memory.x so that flash origin is at 0x0
  2. Run the compile task
  3. Run run\_qemu.sh in a terminal to start qemu with the example project
  4. Set a breakpoint on main
  5. Start the debug configuration "Remote debug (qemu)"

### Using OpenOCD

  1. Update memory.x so that flash origin is at 0x08000000
  2. Run the compile task
  3. Set a breakpoint on main
  4. Start the debug configuration "Debug Microcontroller"
 
## How does it work?

The ex\* scripts check if a container exists and if so reuses it. If not, the container is created including a named volume (rust-cargo-vol) to store persistent changes to the Rust environment. A command is ran inside the container to create a user corresponding to the user calling the ex script. This user has its umask set to 002 and is added to "rust" group so that the user has write access to the cargo folder (mounted from the named volume). If ex_theia is ran, the bashrc script is sourced after which the run.sh script is ran inside the container. The bashrc script changes the dir to the same location from which the ex script was ran (via the CONTAINER_START_PATH environment variable). This is done only if the current path is within the users mounted HOME dir. Next the bashrc script sources nvm_setup.sh which activates a specific node version and adds yarn to the path. Lastly it sets up the rust build environment through RUSTUP_HOME and CARGO_HOME. Once the environment is sourced the run.sh script can actually start Theia.

The container is started with the "--privileged" flag. This ensures that openocd can access the jtag programmer via USB.


