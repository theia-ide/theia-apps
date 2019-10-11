// copied from https://github.com/theia-ide/theia/blob/master/examples/browser/wdio.base.conf.js

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

 // Based on https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js
  /********************************************************************************
   * Copyright (c) JS Foundation and other contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * 'Software'), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   * 
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
   * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
   * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
   * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
   * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   ********************************************************************************/

// @ts-check 
const http = require('http');
const path = require('path');
const temp = require('temp');

const wdioRunnerScript = require.resolve('webdriverio/build/lib/runner.js');

// Remove .track() if you'd like to keep the workspace and other temporary
// files after running the tests.
const temptrack = temp.track();

/**
 * WebdriverIO will execute this current script first to setup the tests,
 *  and it will re-execute it for every test workers (subprocesses).
 * This means that if we are to set a random port for Theia's backend in the master process,
 *  we have to pass the port value to the child processes.
 * This is done via command line arguments: the following lines fetch the port passed
 *  to the script, it should be set by the master process for the children,
 *  but you can also specify it manually by doing `yarn test --theia-port 4000` from
 *  `examples/browser`.
 */
const cliPortKey = '--theia-port';
const cliPortIndex = process.argv.indexOf(cliPortKey);
const masterPort = cliPortIndex > -1 ? process.argv[cliPortIndex + 1] : 0; // 0 if master
if (typeof masterPort === 'undefined') {
    throw new Error(`${cliPortKey} expects a number as following argument`);
}

const port = masterPort;
const host = 'localhost';

function makeConfig(headless) {
    return {
        //
        // ==================
        // Specify Test Files
        // ==================
        // Define which test specs should run. The pattern is relative to the directory
        // from which `wdio` was called. Notice that, if you are calling `wdio` from an
        // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
        // directory is where your package.json resides, so `wdio` will be called from there.
        //

        // this is a very basic test suite that should work on all our Theia applications. 
        specs: [
            './main-page/main-page.ui-spec.ts'
        ],
        // Patterns to exclude.
        exclude: [
            // 'path/to/excluded/files'
        ],
        //
        // ============
        // Capabilities
        // ============
        // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
        // time. Depending on the number of capabilities, WebdriverIO launches several test
        // sessions. Within your capabilities you can overwrite the spec and exclude options in
        // order to group specific specs to a specific capability.
        //
        // First, you can define how many instances should be started at the same time. Let's
        // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
        // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
        // files and you set maxInstances to 10, all spec files will get tested at the same time
        // and 30 processes will get spawned. The property handles how many capabilities
        // from the same test should run tests.
        //
        maxInstances: 10,
        //
        // If you have trouble getting all important capabilities together, check out the
        // Sauce Labs platform configurator - a great tool to configure your capabilities:
        // https://docs.saucelabs.com/reference/platforms-configurator
        //
        capabilities: [{
            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 5,
            browserName: 'chrome',
            chromeOptions: {
                args: headless ? ['--headless', '--disable-gpu'] : [],
            },
        }],
        //
        // ===================
        // Test Configurations
        // ===================
        // Define all options that are relevant for the WebdriverIO instance here
        //
        // By default WebdriverIO commands are executed in a synchronous way using
        // the wdio-sync package. If you still want to run your tests in an async way
        // e.g. using promises you can set the sync option to false.
        sync: true,
        //
        // Level of logging verbosity: silent | verbose | command | data | result | error
        logLevel: 'result',
        //
        // Enables colors for log output.
        coloredLogs: true,
        //
        // If you only want to run your tests until a specific amount of tests have failed use
        // bail (default is 0 - don't bail, run all tests).
        bail: 0,
        //
        // Saves a screenshot to a given path if a command fails.
        screenshotPath: './errorShots/',
        //
        // Set a base URL in order to shorten url command calls. If your url parameter starts
        // with "/", then the base url gets prepended.
        baseUrl: `http://${host}:${port}`,
        //
        // Default timeout for all waitFor* commands.
        waitforTimeout: 30000,
        //
        // Default timeout in milliseconds for request
        // if Selenium Grid doesn't send response
        connectionRetryTimeout: 90000,
        //
        // Default request retries count
        connectionRetryCount: 3,
        //
        // Initialize the browser instance with a WebdriverIO plugin. The object should have the
        // plugin name as key and the desired plugin options as properties. Make sure you have
        // the plugin installed before running any tests. The following plugins are currently
        // available:
        // WebdriverCSS: https://github.com/webdriverio/webdrivercss
        // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
        // Browserevent: https://github.com/webdriverio/browserevent
        // plugins: {
        //     webdrivercss: {
        //         screenshotRoot: 'my-shots',
        //         failedComparisonsRoot: 'diffs',
        //         misMatchTolerance: 0.05,
        //         screenWidth: [320,480,640,1024]
        //     },
        //     webdriverrtc: {},
        //     browserevent: {}
        // },
        //
        // Test runner services
        // Services take over a specific job you don't want to take care of. They enhance
        // your test setup with almost no effort. Unlike plugins, they don't add new
        // commands. Instead, they hook themselves up into the test process.
        services: ['selenium-standalone'],
        seleniumArgs: {
            seleniumArgs: ["-port", "4444"],
            javaArgs: ["-Xmx1024m", "-Djna.nosys=true"],
            drivers: {
                chrome: {
                    version: '2.35'
                }
            }
        },
        seleniumInstallArgs: {
            drivers: {
                chrome: {
                    version: '2.35'
                }
            }
        },
        //
        // Framework you want to run your specs with.
        // The following are supported: Mocha, Jasmine, and Cucumber
        // see also: http://webdriver.io/guide/testrunner/frameworks.html
        //
        // Make sure you have the wdio adapter package for the specific framework installed
        // before running any tests.
        framework: 'mocha',
        //
        // Test reporter for stdout.
        // The only one supported by default is 'dot'
        // see also: http://webdriver.io/guide/testrunner/reporters.html
        reporters: ['spec'],

        //
        // Options to be passed to Mocha.
        // See the full list at http://mochajs.org/
        mochaOpts: {
            ui: 'bdd',
            compilers: ['ts:ts-node/register'],
            requires: ['reflect-metadata/Reflect'],
            watch: 'ts',
            timeout: 30000,
        },
        //
        // =====
        // Hooks
        // =====
        // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
        // it and to build services around it. You can either apply a single function or an array of
        // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
        // resolved to continue.
        //
        // Gets executed once before all workers get launched.
        onPrepare: function (config, capabilities) {
            // Modify process.argv so that the server (which is in the
            // master process) starts with a temporary directory as the
            // workspace.
            const rootDir = temptrack.mkdirSync();
            const argv = [process.argv[0], 'src-gen/backend/server.js', '--root-dir=' + rootDir];
            // return require('./src-gen/backend/server')(port, host, argv).then(created => {
                console.log("argv: " + argv);
                console.log("wdioRunnerScript:" + wdioRunnerScript);
                console.log("cliPortKey:" + cliPortKey);
                console.log("port:" + port);
                // this.execArgv = [wdioRunnerScript, cliPortKey, created.address().port, '--theia-root-dir', rootDir];
                this.execArgv = [wdioRunnerScript, cliPortKey, port, '--theia-root-dir', rootDir];
                // this.server = created;
            // });
        },
        // Gets executed after all workers got shut down and the process is about to exit. It is not
        // possible to defer the end of the process using a promise.
        onComplete: function (exitCode) {
            // if (this.server) {
                // this.server.close();
            // }
        },
        //
        // Gets executed just before initialising the webdriver session and test framework. It allows you
        // to manipulate configurations depending on the capability or spec.
        // beforeSession: function (config, capabilities, specs) {
        // },
        //
        // Gets executed before test execution begins. At this point you can access all global
        // variables, such as `browser`. It is the perfect place to define custom commands.
        // before: function (capabilities, specs) {
        // },
        //
        // Hook that gets executed before the suite starts
        // beforeSuite: function (suite) {
        // },
        //
        // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
        // beforeEach in Mocha)
        // beforeHook: function () {
        // },
        //
        // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
        // afterEach in Mocha)
        // afterHook: function () {
        // },
        //
        // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
        // beforeTest: function (test) {
        // },
        //
        // Runs before a WebdriverIO command gets executed.
        // beforeCommand: function (commandName, args) {
        // },
        //
        // Runs after a WebdriverIO command gets executed
        // afterCommand: function (commandName, args, result, error) {
        // },
        //
        // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
        // afterTest: function (test) {
        // },
        //
        // Hook that gets executed after the suite has ended
        // afterSuite: function (suite) {
        //     require("webdriverio");
        //     var fs = require("fs");
        //     let result = browser.execute("return window.__coverage__;")
        //     try {
        //         if (!fs.existsSync('coverage')) {
        //             fs.mkdirSync('coverage');
        //         }
        //         fs.writeFileSync('coverage/coverage.json', JSON.stringify(result.value));
        //     } catch (err) {
        //         console.log(`Error writing coverage ${err}`);
        //     };
        // },
        //
        // Gets executed after all tests are done. You still have access to all global variables from
        // the test.
        // after: function (result, capabilities, specs) {
        // },
        //
        // Gets executed right after terminating the webdriver session.
        // afterSession: function (config, capabilities, specs) {
        // },
    }
}

exports.makeConfig = makeConfig;
