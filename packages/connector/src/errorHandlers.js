const fs = require("fs");

/**
 * Function to handler all the unhandled errors and log it with a logger
 * @param {Function} logCallback to log global unhandled errors
 */
export function setupGlobalErrorHandler(logCallback) {
  process.on("uncaughtException", (err) => {
    logCallback({ error: err.toString(), trace: err.stack });
  });
}

/**
 * Function to log messages to a logfile
 * @param {Object} message to be logged
 */
export function log(message) {
  // log only on dev
  if (process.env.NODE_ENV !== "dev") return;

  const dateParts = new Date().toString().split(" ");
  const logDate = `${dateParts[4]}:${dateParts[2]}:${dateParts[3]}: `;
  fs.appendFileSync(
    "./log.txt",
    `${logDate}\t${JSON.stringify(message, null, 2)}\n`
  );
}
