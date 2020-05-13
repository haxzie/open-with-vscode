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
  const httpsCloneEl = modalEl.getElementsByClassName("https-clone-options")[0];
  const httpsCloneUrl = httpsCloneEl.getElementsByClassName("input-sm")[0]
    .value;

  const sshCloneEl = modalEl.getElementsByClassName("ssh-clone-options")[0];
  const sshCloneUrl = sshCloneEl.getElementsByClassName("input-sm")[0].value;

  const httpsDisplay = window.getComputedStyle(httpsCloneEl).display;
  if (httpsDisplay === "block") {
    return httpsCloneUrl;
  } else {
    return sshCloneUrl;
  }
}


/**
 * Function to append a new button called "Open with VSCode"
 * into the drop down modal of GitHub clone button
 */
function appendOpenWithButton() {
  const openWithCodeButtonEl = document.createElement("button");
  openWithCodeButtonEl.setAttribute(
    "class",
    "flex-1 btn btn-outline get-repo-btn"
  );
  openWithCodeButtonEl.innerHTML = "Clone and open with Code";

  const openWithCodeContainerEl = document.createElement("div");
  openWithCodeContainerEl.setAttribute("class", "d-flex");
  openWithCodeContainerEl.appendChild(openWithCodeButtonEl);

  openWithCodeContainerEl.onclick = (e) => {
    console.log("Open with code clicked");
  };

  getModalEl().appendChild(openWithCodeContainerEl);
}


appendOpenWithButton();