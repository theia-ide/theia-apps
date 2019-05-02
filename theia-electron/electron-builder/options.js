// @ts-check
/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

/**
 * @param {Boolean} [preview]
 * @return {import('electron-builder').Configuration}
 */
exports.getTheiaBundleConfiguration = function (preview) {
    return {
        electronDist: 'node_modules/electron/dist',
        productName: 'Theia',
        appId: 'theia',
        asar: false,
        directories: {
            buildResources: 'resources'
        },
        files: [
            'src-gen/**/*',
            'lib/**/*',
            'node_modules/**/*',
            'package.json'
        ],
        win: {
            target: preview ? 'dir' : [
                'nsis'
            ]
        },
        mac: {
            target: preview ? 'dir' : [
                'dmg'
            ]
        },
        linux: {
            target: preview ? 'dir' : [
                'deb',
                'AppImage'
            ],
            category: 'Development',
            icon: 'resources/icons'
        },
        nsis: {
            menuCategory: true,
            oneClick: false,
            perMachine: true,
            installerHeaderIcon: 'resources/icon.ico',
            installerIcon: 'resources/icon.ico',
            uninstallerIcon: 'resources/icon.ico',
            installerSidebar: 'resources/installerSidebar.bmp',
            uninstallerSidebar: 'resources/installerSidebar.bmp',
            allowToChangeInstallationDirectory: true,
            runAfterFinish: false,
            artifactName: '${productName}-Installer-${version}.${ext}'
        },
        dmg: {
            icon: 'resources/icon.icns',
            iconSize: 128,
            contents: [
                {
                    x: 380,
                    y: 240,
                    type: 'link',
                    path: '/Applications'
                },
                {
                    x: 122,
                    y: 240,
                    type: 'file'
                }
            ]
        },
        publish: {
            provider: 'github'
        }
    };
}
