# Theia cpp Docker

A containerized Theia-based C/C++ demo IDE, including commonly used tools:

- latest clangd Language Server (nightly build)
- latest stand-alone clang-tidy static analyser (nightly build)
- GDB 8.1 (from Ubuntu repo)
- cmake 3.17.0

The included Theia-based IDE application has the following notable features

- [deprecated][latest][@theia/cpp] Language-server built-in clang-tidy static analyser integration. Will analyse files opened in the IDE's editors and report problems for configured rules. See [README](https://github.com/theia-ide/theia/tree/master/packages/cpp#using-the-clang-tidy-linter) for more details, including related preferences. Note: this LSP client is _deprecated_ and will be replaced once `vscode-clangd` works well with _latest_ Theia
- [next][vscode-clangd] The reference [Language Client for clangd](https://open-vsx.org/extension/llvm-vs-code-extensions/vscode-clangd)
- [@theia/cpp-debug] Basic C/C++ debugging support

## How to use

Run on http://localhost:3000 with the current directory as a workspace:

```bash
docker run --security-opt seccomp=unconfined --init -it -p 3000:3000 -v "$(pwd):/home/project:cached" theiaide/theia-cpp:next
```

Options:

- `--security-opt seccomp=unconfined` enables running without [the default seccomp profile](https://docs.docker.com/engine/security/seccomp/) to allow cpp debugging. Note: anecdotally I am able to debug without this option now. I am not sure what may have changed recently.
- `--init` injects an instance of [tini](https://github.com/krallin/tini) in the container, that will wait-for and reap terminated processes, to avoid leaking PIDs.

## How to build

Build image using `next` Theia packages and strip the Theia application to save space (with reduced debuggability)

```bash
docker build --no-cache --build-arg version=next --build-arg strip=true  -t theia-cpp:next .
```

Build image using `latest` theia packages (Theia app not stripped)

```bash
docker build --no-cache --build-arg version=latest --build-arg -t theia-cpp:latest .
```
