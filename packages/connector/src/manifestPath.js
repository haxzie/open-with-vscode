const path = require("path");
const os = require("os");
const HOME_DIR = os.homedir();

function getNativeDirPath() {
  const os_name = os.platform().toLowerCase();
  switch (os_name) {
    case "linux":
      return path.join(HOME_DIR, ".mozilla", "native-messaging-hosts");
    case "darwin":
      return path.join(
        HOME_DIR,
        "Library",
        "Application Support",
        "Mozilla",
        "NativeMessagingHosts"
      );
    default:
        return false;
  }
}

module.exports = {
    getNativeDirPath
}
