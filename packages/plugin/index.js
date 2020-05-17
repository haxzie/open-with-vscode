
import { appendOpenWithButton, disableButton, setButtonText } from "./src/DOMActions";

console.log("Script connected")

appendOpenWithButton();

browser.runtime.onMessage.addListener((message) => {
  console.log("CS", message);
  switch (message.action) {
    case "CHECK":
      if (message.status_code === 200) {
        disableButton(false);
        setButtonText("Open with VSCode");
      }
      break;
    case "OPEN":
      if (message.status_code === 201) {
        disableButton(true);
        setButtonText("Cloning repo...");
      } else if (message.status_code === 200) {
        disableButton(false);
        setButtonText("Open with VSCode");
      }
      break;
  }
});
