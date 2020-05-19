const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { getNativeDirPath } = require("./src/manifestPath");
const nativeDirPath = getNativeDirPath(); // directory in which browsers store the native manifests

// sample native messaging config file
let config = {
  name: "open_with_vscode",
  description: "Host for executing git commads",
  path: null,
  type: "stdio",
  allowed_extensions: ["open-with-vscode@haxzie.com"],
};

console.log("Copying manifest files...");

try {
  // check if the firefox's native messaging host directory is present
  if (
    !fs.existsSync(nativeDirPath)
  ) {
    // if not, make the directory
    fs.mkdirSync(nativeDirPath, {
      recursive: true,
    });
  }

  // find the installation location of the cli tool
  // use that to append to the config file
  exec("npm bin -g", (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      process.exit(0);
      return;
    }

    if (stdout) {
      const bin_path = stdout.trim();
      console.log(stdout);
      config.path = path.join(bin_path, "open-with-vscode");

      // copy the config files to firefox's native messaging sub directory
      if (nativePath) {
        fs.writeFileSync(
          path.join(nativePath, "open_with_vscode.json"),
          JSON.stringify(config, null, 2)
        );
      } else {
        // if native path is not present, likely the OS is windows
        console.error("Unable to create native manifests, Your OS might not be supported");
        process.exit(-1);
      }
    }
  });
} catch (error) {
  console.error("Unable to copy manifest files..");
  console.error({ error });
}
