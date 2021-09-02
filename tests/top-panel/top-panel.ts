/********************************************************************************
 * Copyright (C) 2017-2018 Ericsson and others.
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

import 'webdriverio';

export class TopPanel {

    public constructor(protected readonly driver: WebdriverIO.Client<void>) { }

    /**
     * Determine if the top-panel exists.
     * @returns `true` if the top-panel exists.
     */
    exists(): boolean {
        return this.driver.isExisting('div#theia-top-panel');
    }

    /**
     * Determine if the menu exists in the top-panel.
     * @param label the human-readable menu label.
     */
    menuExists(label: string): boolean {
        return this.driver.element('#theia-top-panel').isExisting(`div=${label}`);
    }

}
