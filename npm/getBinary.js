const { Binary } = require('binary-install');
const os = require('os');

const x64 = 'x64';
function getPlatform() {
    const type = os.type();
    const arch = os.arch();

    if (type === 'Windows_NT' && arch === x64) return 'win64';
    if (type === 'Windows_NT') return 'win32';
    if (type === 'Linux' && arch === x64) return 'linux';
    if (type === 'Darwin' && arch === x64) return 'macos';

    throw new Error(`Unsupported platform: ${type} ${arch}`);
}

const DOWNLOAD_PATH = 'https://github.com/Konstantin-Babushkin/wasm-grate/releases/download'
function getBinary() {
    const platform = getPlatform();
    const version = require('../package.json').version;
    const url = `${DOWNLOAD_PATH}/v${version}/wasm-grate-${platform}.tar.gz`;
    const name = 'wasm-grate';
    return new Binary(url, { name });
}

module.exports = getBinary;