const Path = require("path");

const homeDirectory = process.env.HOME;

function setupForMac(defaultPaths) {
  defaultPaths.chrome = Path.join(
    homeDirectory,
    "Library",
    "Application Support",
    "Google",
    "Chrome",
  );
}

function setupDefaultPaths(defaultPaths) {
  switch (process.platform) {
    case "darwin":
      return setupForMac(defaultPaths);
    default:
      console.error(`Platform ${process.platform} is not supported by node-browser-history`);
  }
}

module.exports = {
  setupDefaultPaths,
};
