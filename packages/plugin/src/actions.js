/**
 * Sends a message to the background script to open with code
 * @param {String} url
 */
export function openWithCode(url) {
  browser.runtime.sendMessage({ action: "OPEN", url });
  console.log("Open with code clicked");
}

/**
 * Sends message to check if the repository is already cloned
 * @param {String} url 
 */
export function checkIfCloned(url) {
  browser.runtime.sendMessage({ action: "CHECK", url });
  console.log("Checking if the repo is already cloned");
}
