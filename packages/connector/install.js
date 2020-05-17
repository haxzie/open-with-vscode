const fs = require("fs");
const path = require("path");
const HOME_DIR = require("os").homedir();
const { exec } = require("child_process");

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
    !fs.existsSync(path.join(HOME_DIR, ".mozilla", "native-messaging-hosts"))
  ) {
      // if not, make the directory
    fs.mkdirSync(path.join(HOME_DIR, ".mozilla", "native-messaging-hosts"), {
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
      config.path = path.join(bin_path, 'open-with-vscode');

      // copy the config files to firefox's native messaging sub directory
      fs.writeFileSync(
        path.join(
          HOME_DIR,
          ".mozilla",
          "native-messaging-hosts",
          "open_with_vscode.json"
        ),
        JSON.stringify(config, null, 2)
      );
    }
  });
} catch (error) {
  console.error("Unable to copy manifest files..");
  console.error({ error });
}
