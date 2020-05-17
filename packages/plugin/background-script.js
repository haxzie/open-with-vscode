var port = browser.runtime.connectNative("open_with_vscode");

// messages sent from the native application is recieved here
port.onMessage.addListener((message) => {
  browser.tabs.sendMessage(message.tab_id, message).catch((error) => {
    console.error("Unable to send reply to tab_id", { message });
    console.error(error);
  });
});

// browser.runtime.onConnect.addListener(() => {

// });
browser.runtime.onMessage.addListener((message, sender) => {
  console.log({ sender }, { message });
  try {
    port.postMessage({ ...message, tab_id: sender.tab.id });
  } catch (error) {
    console.log(error);
  }
});
