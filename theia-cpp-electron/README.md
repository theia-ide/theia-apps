## Theia C/C++ Electron Example

Build an Electron C/C++ Theia IDE, from the Eclipse Theia platform, using the `package.json` present in this folder. Electron applications are a good
choice for local development.

### Install dependencies

#### 1. Theia development dependencies
See [here](https://github.com/theia-ide/theia/blob/master/doc/Developing.md#prerequisites) for dependencies you'll need to build a Theia application.

#### 2. clangd
You will need to install the [clangd](https://clang.llvm.org/extra/clangd/Installation.html) language server.

By default, the `clangd` executable is assumed to be named the same and be in the system's path. You can configure an alternate name using the preference `cpp.clangdExecutable`.

If you wish to provide startup arguments to `clangd`, use the preference `cpp.clangdArgs`.

You may override the default value of preferences by editing the `preferences` entry in `package.json`.

### Configurations

#### clang-tidy integration
If you wish to use the [clang-tidy linter integration](https://github.com/theia-ide/theia/blob/master/packages/cpp/README.md#using-the-clang-tidy-linter), you will need to install clangd version 9 or higher, that has a built-in `clang-tidy`, that can provide diagnostics in your Theia editor as you type. You also need to enable the integration using the `cpp.clangTidy` preference.

#### @theia/cpp
The C/C++ features are provided by the `@theia/cpp` extension. Look [here](https://github.com/theia-ide/theia/blob/master/packages/cpp/README.md) for more details about this extension.


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
