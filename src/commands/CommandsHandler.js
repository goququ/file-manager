import { ERRORS_MAP } from "../consts.js";
import { COMMANDS_MAP } from "./index.js";

export class CommandsHandler {
  constructor({ logger, commands = COMMANDS_MAP, data = {} }) {
    this.logger = logger || console;
    this.commands = commands;
    this.data = data;
  }

  _getCommandFunc(command = "") {
    const commandName = command.split(" ")[0].replaceAll(/[\W]/g, "");
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
        data: this.data,
      });
    } catch (err) {
      this.logger.error(ERRORS_MAP.failed);
    }
  }
}
