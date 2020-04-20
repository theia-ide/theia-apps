# Theia C/C++ Electron Example

One can build an Electron (desktop) Theia example application for C/C++ development, using the `package.json` present in this folder. Electron applications are a good choice for local development but not good for Cloud.

## Install dependencies

### 1. Theia development dependencies

See [here](https://github.com/theia-ide/theia/blob/master/doc/Developing.md#prerequisites) for dependencies you'll need to build a Theia application.

### 2. clangd

You will need to install the [clangd](https://clang.llvm.org/extra/clangd/Installation.html) language server.

By default, the `clangd` executable is assumed to be named the same and be in the system's path. You can configure an alternate name using the preference `clangd.path`.

If you wish to provide startup arguments to `clangd`, use the preference `clangd.arguments`.

## Configurations

### clang-tidy integration

If you wish to use the clang_tidy linter integration you will need to install clangd version 9 or higher which has a built-in clang-tidy available. This will provide diagnostics in your Theia editor as you type.

### vscode-clangd

This application uses the [vscode-clangd](https://open-vsx.org/extension/llvm-vs-code-extensions/vscode-clangd) VS Code extension. You can find related preferences under "clangd" in the running application.

### Build

Build like so:

```
$> cd theia-app/theia-cpp-electron
$> yarn; yarn build
```

Start with defaults:
```
$> yarn start
```

You can add startup arguments as well:
```
$> yarn theia start /home/user/workspace
```

If you wish to package your application, you might take inspiration from the `theia-electron` [example](https://github.com/theia-ide/theia-apps/tree/master/theia-electron).
