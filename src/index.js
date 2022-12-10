import os from "node:os";
import * as readline from "node:readline/promises";

import { CommandsHandler } from "./commands/CommandsHandler.js";
import { AppLogger } from "./utils/AppLogger.js";
import { AppState } from "./utils/AppState.js";

const logger = new AppLogger();
const state = new AppState();
const commandsHandler = new CommandsHandler({ logger, state });

// initialization
process.chdir(os.homedir());
logger.log(`\nWelcome to the File Manager, ${state.username ?? "User"}!\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getQuestion = async () => {
  const answer = await rl.question(`
You are currently in ${process.cwd()}
[${state.username}] # \
`);

  const command = answer.toString("utf8").trim();
  commandsHandler.handle(command);

  getQuestion();
};

getQuestion();
