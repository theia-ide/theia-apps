# Theia Scala Docker

> This is an example Theia container, tested in a few of the many possible Scala setups. The strategy was to start from the java example with some adjustments and grow from there.
> 
> More thorough testing is needed to confirm if all features delivered by the Metals plugin actually work as described in [its documentation](https://scalameta.org/metals/docs/editors/vscode.html).  Feel free to try and collaborate on improving it ;)

## Build

```bash
docker build . -t theiaide/theia-scala:latest
```

The image described by the Dockerfile already contains the common tools for the usual Scala/JVM ecosystem (including maven, gradle and sbt).

It also contains SDKMAN! to make it easier to play with other jvm implementations and dependencies for Scala Native projects (like clang and re2) and Scala.js (which requires Node.js)

## Run
Go to the folder containing the project you want to work with and call the following:
```bash
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" --name theia-scala theiaide/theia-scala:latest
```

> **Caveat**: The first couple of times I tried getting a project up and running in between container builds, metals plugin failed to connect to the build server, which is supposed to be downloaded and started by the plugin itself. Looking at the repeated "Waiting for the bsp connection to come up..." on the logs, I imagined it was timing out while the dependencies where being downloaded.
> 
> Starting Theia with `docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" -v "$(pwd)/.sbt:/home/theia/.sbt" -v "$(pwd)/.ivy2:/home/theia/.ivy2" -v "$(pwd)/.cache:/home/theia/.cache" --name theia-scala theiaide/theia-scala:latest` helped mitigating the issue by letting the container just reuse all downloaded dependencies I already had in my host machine in between runs.
> 
> You should also consider using a `--name` per project. This way, starting and stopping the work on each project becomes a simple matter of starting and stopping the relevant container.

If you don't already have some scala project laying around, you can for instance follow this hello world tutorial: `https://docs.scala-lang.org/getting-started/sbt-track/getting-started-with-scala-and-sbt-on-the-command-line.html`. Afterwards, spin a container on the project folder, point to http://localhost:3000 to check that Theia is up and running.

It should start preparing the workspace with some needed downloads and soon ask about importing the sbt project. Confirm and go make yourself some coffee ;)

You should be good to go once you see in the output panel that all dependency downloads are finished.

## Native binaries

If your project produces native binaries using scala-native or GraalVM, do not forget to setup cross compilation if you intend to use the binary outside the container. As the image is running in `linux-amd64`, the resulting binary would't run on a Mac for instance.

Check the chosen platform documentation and friendly community for more information on how to achieve that.
On the other hand, having the container in one architecture and the host in another, allows the creation of binaries for two different platforms "out-of-the-box" :)

Just build on both host and guest to get the two different platform binaries (running `sbt nativeLink` for Scala Native or `sbt graalvm-native-image:packageBin` for Scala over GraalVM)
