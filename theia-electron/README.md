## theia-electron

The electron-based Theia application with JavaScript/TypeScript and Java support.

----

No downloads yet but you can build one from the `next` Theia. The prerequisites are defined [here](https://github.com/theia-ide/theia/blob/master/doc/Developing.md#prerequisites), plus you need Node.js `8.12.0` due to the [`electron-builder`](https://github.com/electron-userland/electron-builder/commit/c01b7c0b55d3466b826ea9cc9a11ad34118801c1#diff-a8de729869dd8f08fbe76328e6e803d6R16) dependency.

Note, we do not save the `yarn.lock` file, so whenever you build a new application, you get the most recent, `next` version of Theia. You can find the bundled application in the `dist` folder.

If you need another output format, for instance you prefer ZIP instead of an NSIS installer on Windows, submit a [new issue](https://github.com/theia-ide/theia-apps/issues/new). If you experience any defect or malfunction in the application, submit a [new issue in Theia](https://github.com/theia-ide/theia/issues/new).

----

### Build
```
yarn
```

### Package the application
```
yarn package
```

### Create a preview application (without packaging it)
```
yarn package:preview
```

### Troubleshooting

 - [_"Don't expect that you can build app for all platforms on one platform."_](https://www.electron.build/multi-platform-build)