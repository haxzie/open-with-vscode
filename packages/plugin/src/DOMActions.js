import { checkIfCloned, openWithCode } from "./actions";

/**
 * Finds and returns the modal element
 */
function getModalEl() {
  const repoModalEl = document.getElementsByClassName("get-repo-modal")[0];
  const modalEl = repoModalEl.children[0];
  return modalEl;
}

/**
 * Function to get the clone URL displayed in the input field
 * Based on which input section is active (either ssh or https)
 * returns the url that is currently selected by the user
 */
function getCloneUrl() {
  const modalEl = getModalEl();
  // const httpsCloneEl = modalEl.getElementsByClassName("https-clone-options")[0];
  // const httpsCloneUrl = httpsCloneEl.getElementsByClassName("input-sm")[0]
  //   .value;

  const sshCloneEl = modalEl.getElementsByClassName("ssh-clone-options")[0];
  const sshCloneUrl = sshCloneEl.getElementsByClassName("input-sm")[0].value;

  return sshCloneUrl;
}

/**
 * Function to append a new button called "Open with VSCode"
 * into the drop down modal of GitHub clone button
 */
export function appendOpenWithButton() {
  try {
    // check if the modal is present in the page
    if (!getModalEl()) {
      return;
    }

    // check if the open with code button alread exists
    const openButton = document.getElementById("btn-open-with-vscode");
    if (openButton) {
      openButton.onclick = () => {
        openWithCode(getCloneUrl());
      };
    } else {
      // if not, create a new button and append it to the modal
      const openWithCodeButtonEl = document.createElement("button");
      openWithCodeButtonEl.setAttribute("id", "btn-open-with-vscode");
      openWithCodeButtonEl.setAttribute(
        "class",
        "flex-1 btn btn-outline get-repo-btn"
      );
      openWithCodeButtonEl.innerHTML = "Clone and open with Code";

      const openWithCodeContainerEl = document.createElement("div");
      openWithCodeContainerEl.setAttribute("class", "d-flex");
      openWithCodeContainerEl.appendChild(openWithCodeButtonEl);

      openWithCodeContainerEl.onclick = () => {
        openWithCode(getCloneUrl());
      };
      getModalEl().appendChild(openWithCodeContainerEl);
      checkIfCloned(getCloneUrl());
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Function to change the button text
 * @param {String} text of the button
 */
export function setButtonText(text) {
  const openButton = document.getElementById("btn-open-with-vscode");
  openButton.innerHTML = text;
}

/**
 * Function to enable or disable the button
 * @param {Boolean} isDisabled
 */
export function disableButton(isDisabled) {
  const openButton = document.getElementById("btn-open-with-vscode");
  openButton.disabled = isDisabled;
}
