#!/usr/bin/env node

const { listenForMessage } = require("./src/protocol");
const { setupGlobalErrorHandler, log } = require("./src/errorHandlers");
const { cloneAndOpenRepo, checkIfCloned } = require("./src/actions");

/**
 * Setup global error handlers
 */
setupGlobalErrorHandler(log);

/**
 * Listen for new messages
 */
listenForMessage((message) => {
  log({ message })
  try {
    const action = message.action;
    const cloneURL = message.url;
    switch(action) {
      case "OPEN":
        cloneAndOpenRepo(cloneURL, message.tab_id);
        break;
      case "CHECK":
        checkIfCloned(cloneURL, message.tab_id);
        break;
    }
  } catch (error) {
    log({ error: error.toString(), stack: error.stack })
  }
});
