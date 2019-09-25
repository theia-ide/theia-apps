const wdio = require('./wdio.base.conf.js');
const headless = true;

const config = wdio.makeConfig(headless);

const cliPortKey = '--theia-port';
const cliPortIndex = process.argv.indexOf(cliPortKey);
const masterPort = cliPortIndex > -1 ? process.argv[cliPortIndex + 1] : 0; // 0 if master
if (typeof masterPort === 'undefined') {
    throw new Error(`${cliPortKey} expects a number as following argument`);
}

/*  The tests call the url / so we are not able to use the token. 
    Let's disable the token authentication. Otherwise we'll need to 
    update every test to add the token: url="/?token=xxxx"
const cliTokenKey = '--sec-token';
const cliTokenIndex = process.argv.indexOf(cliTokenKey);
const token = cliTokenIndex > -1 ? process.argv[cliTokenIndex + 1] : 0; // 0 if master
if (typeof token === 'undefined') {
    throw new Error(`${cliTokenKey} expects a string as following argument`);
} 
*/

const port = masterPort;
const host = 'localhost';

if (headless)
    config.capabilities[0].chromeOptions.args.push('--allow-insecure-localhost');

config.baseUrl = `https://${host}:${port}`;
exports.config = config;
