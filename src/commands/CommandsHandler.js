import { ERRORS_MAP } from "../consts.js";
import { COMMANDS_MAP } from "./index.js";

export class CommandsHandler {
  constructor({ logger, commands = COMMANDS_MAP, state }) {
    if (!state) {
      throw new Error("No state provided");
    }
    this.logger = logger || console;
    this.commands = commands;
    this.state = state;
  }

  _getCommandFunc(command = "") {
    const commandName = command.trim().split(" ")[0].replaceAll(/[\W]/g, "");
    const func = this.commands[commandName];

    return func;
  }

  handle(command) {
    const func = this._getCommandFunc(command);

    if (!func) {
      this.logger.error(ERRORS_MAP.invalid);
      return;
    }

    try {
      func({
        logger: this.logger,
        state: this.state,
        command,
      });
    } catch (err) {
      console.log(
        "🚀 ~ file: CommandsHandler.js:36 ~ CommandsHandler ~ handle ~ err",
        err
      );
      this.logger.error(ERRORS_MAP.failed);
    }
  }
}
