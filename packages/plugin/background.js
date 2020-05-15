var port = browser.runtime.connectNative("open_with_vscode");

port.onMessage.addListener((response) => {
  console.log("Received: ", response);
});

browser.runtime.onMessage.addListener((message) => {
  console.log("Recieved message: ", { message });
  try {
    port.postMessage(message);
  } catch (error) {
    console.log(error);
  }
});
