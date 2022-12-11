import os from "node:os";
import * as readline from "node:readline/promises";

import { CommandsHandler } from "./commands/CommandsHandler.js";
import { AppLogger } from "./utils/AppLogger.js";
import { getArgsMap } from "./utils/getArgsMap.js";
import { sanitizeCommand } from "./utils/sanitizeCommand.js";

const logger = new AppLogger();
const data = getArgsMap(process.argv.slice(2), {
  username: "Unknown User",
});
const commandsHandler = new CommandsHandler({ logger, data });

// initialization
process.chdir(os.homedir());
logger.log(`\nWelcome to the File Manager, ${data.username}!\n`);

const rl = readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .on("SIGINT", () => {
    commandsHandler.handle(".exit");
  });

const getQuestion = async () => {
  const answer = await rl.question(`
You are currently in ${process.cwd()}
[${data.username}] # \
`);

  const command = sanitizeCommand(answer.toString("utf8"));
  await commandsHandler.handle(command);

  getQuestion();
};

getQuestion();
