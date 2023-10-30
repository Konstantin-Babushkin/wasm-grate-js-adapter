const { Binary } = require("binary-install");
const os = require("os");
const { join } = require("path");
const cTable = require("console.table");

const error = msg => {
  console.error(msg);
  process.exit(1);
};

const { version, name } = require("../package.json");

const supportedPlatforms = [
  {
    TYPE: "Windows_NT",
    ARCHITECTURE: "x64",
    RUST_TARGET: "x86_64-pc-windows-msvc",
    BINARY_NAME: "wasm-grate-win.exe"
  },
  {
    TYPE: "Linux",
    ARCHITECTURE: "x64",
    RUST_TARGET: "x86_64-unknown-linux-musl",
    BINARY_NAME: "wasm-grate-linux"
  },
  {
    TYPE: "Darwin",
    ARCHITECTURE: "x64",
    RUST_TARGET: "x86_64-apple-darwin",
    BINARY_NAME: "wasm-grate-mac-x64"
  },
  {
    TYPE: "Darwin",
    ARCHITECTURE: "arm64",
    RUST_TARGET: "x86_64-apple-darwin",
    BINARY_NAME: "wasm-grate-mac-arm64"
  }
];

const getPlatformMetadata = () => {
  const type = os.type();
  const architecture = os.arch();

  for (let supportedPlatform of supportedPlatforms) {
    if (
      type === supportedPlatform.TYPE &&
      architecture === supportedPlatform.ARCHITECTURE
    ) {
      return supportedPlatform;
    }
  }

  error(
    `Platform with type "${type}" and architecture "${architecture}" is not supported by ${name}.\nYour system must be one of the following:\n\n${cTable.getTable(
      supportedPlatforms
    )}`
  );
};

const DOWNLOAD_PATH = 'https://github.com/Konstantin-Babushkin/wasm-grate/releases/download'
const getBinary = () => {
  const platformMetadata = getPlatformMetadata();
  const url = `${DOWNLOAD_PATH}/v${version}/wasm-grate-${platformMetadata.RUST_TARGET}.tar.gz`;
  return new Binary(platformMetadata.BINARY_NAME, url, version, {
    installDirectory: join(__dirname, "node_modules", ".bin")
  });
};

const run = () => {
  const binary = getBinary();
  binary.run();
};

const install = () => {
  const binary = getBinary();
  binary.install();
};

module.exports = {
  install,
  run
};