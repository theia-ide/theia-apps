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

/* tslint:disable:no-unused-expression*/
import { expect } from 'chai';
import { TopPanel } from './top-panel';
import { MainPage } from '../main-page/main-page';

let topPanel: TopPanel;
let mainPage: MainPage;

before(() => {
    const driver = browser;
    const url = '/';

    driver.url(url);
    driver.localStorage('DELETE');
    driver.refresh();

    topPanel = new TopPanel(driver);
    mainPage = new MainPage(driver);

    // Make sure that the application shell is loaded.
    mainPage.waitForStartup();
});

describe('theia top-panel (menubar)', () => {

    it('should show the top panel', () => {
        expect(topPanel.exists()).to.be.true;
    });

    describe('top-panel menus', () => {

        it('should show the \'File\' menu', () => {
            expect(topPanel.menuExists('File')).to.be.true;
        });

        it('should show the \'Edit\' menu', () => {
            expect(topPanel.menuExists('Edit')).to.be.true;
        });

        it('should show the \'Selection\' menu', () => {
            expect(topPanel.menuExists('Selection')).to.be.true;
        });

        it('should show the \'View\' menu', () => {
            expect(topPanel.menuExists('View')).to.be.true;
        });

        it('should show the \'Go\' menu', () => {
            expect(topPanel.menuExists('Go')).to.be.true;
        });

        it('should show the \'Run\' menu', () => {
            expect(topPanel.menuExists('Run')).to.be.true;
        });

        it('should show the \'Terminal\' menu', () => {
            expect(topPanel.menuExists('Terminal')).to.be.true;
        });

        it('should show the \'Help\' menu', () => {
            expect(topPanel.menuExists('Help')).to.be.true;
        });

    });

});
