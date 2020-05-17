const fs = require("fs");
const path = require("path");
const HOME_DIR = require("os").homedir();
const { exec } = require("child_process");
let config = {
  name: "open_with_vscode",
  description: "Host for executing git commads",
  path: null,
  type: "stdio",
  allowed_extensions: ["open-with-vscode@haxzie.com"],
};

console.log("Copying manifest files...");

try {
  if (
    !fs.existsSync(path.join(HOME_DIR, ".mozilla", "native-messaging-hosts"))
  ) {
    fs.mkdirSync(path.join(HOME_DIR, ".mozilla", "native-messaging-hosts"), {
      recursive: true,
    });
  }

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
