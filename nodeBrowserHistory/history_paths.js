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

function setupForWindows(defaultPaths) {
  const appDataDirectory = Path.join(
    process.env.HOMEDRIVE,
    "Users",
    process.env.USERNAME,
    "AppData",
  );

  defaultPaths.chrome = Path.join(appDataDirectory, "Local", "Google", "Chrome");
}

function setupDefaultPaths(defaultPaths) {
  switch (process.platform) {
    case "darwin":
      return setupForMac(defaultPaths);
    case "win32":
      return setupForWindows(defaultPaths);
    default:
      console.error(`Platform ${process.platform} is not supported by node-browser-history`);
  }
}

module.exports = {
  setupDefaultPaths,
};
