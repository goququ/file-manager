import { getArgsMap } from "./utils/getArgsMap.js";
import { CommandsHandler } from "./commands/CommandsHandler.js";
import { AppLogger } from "./utils/AppLogger.js";

const data = getArgsMap({ username: "Unknown User" });
const logger = new AppLogger();
const commandsHandler = new CommandsHandler({ logger, data });

logger.log(`\nWelcome to the File Manager, ${data.username ?? "User"}!\n`);

process.stdin.on("data", function (data) {
  const command = data.toString("utf8");
  commandsHandler.handle(command);
});

process.on("SIGINT", () => {
  commandsHandler.handle("exit");
});
