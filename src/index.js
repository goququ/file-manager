import os from "node:os";

import { CommandsHandler } from "./commands/CommandsHandler.js";
import { AppLogger } from "./utils/AppLogger.js";
import { AppState } from "./utils/AppState.js";
import { printPrompt } from "./utils/printPrompt.js";

const logger = new AppLogger();
const state = new AppState();
const commandsHandler = new CommandsHandler({ logger, state });

// initialization
process.chdir(os.homedir());
logger.log(`\nWelcome to the File Manager, ${state.username ?? "User"}!\n`);
printPrompt({ logger, state });

process.stdin.on("data", function (data) {
  const command = data.toString("utf8").trim();
  commandsHandler.handle(command);
  printPrompt({ logger, state });
});

process.on("SIGINT", () => {
  commandsHandler.handle("exit");
});
