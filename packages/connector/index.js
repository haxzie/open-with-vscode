#!/usr/bin/env node

const { listenForMessage } = require("./src/protocol");
const { setupGlobalErrorHandler, log } = require("./src/errorHandlers");
const { cloneAndOpenRepo, checkIfCloned } = require("./src/actions");

/**
 * Setup global error handlers
 */
setupGlobalErrorHandler();

/**
 * Listen for new messages
 */
listenForMessage((message) => {
  try {
    const action = message.action;
    switch(action) {
      case "OPEN":
        const cloneURL = message.url;
        cloneAndOpenRepo(cloneURL);
        break;
      case "CHECK":
        const cloneURL = message.url;
        checkIfCloned(cloneURL);
        break;
    }
  } catch (error) {
    log({ error: error.toString(), stack: error.stack })
  }
});
