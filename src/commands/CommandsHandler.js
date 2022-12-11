import { ERRORS_MAP } from "../utils/AppError.js";
import { AppError } from "../utils/AppError.js";
import { COMMANDS_MAP } from "./index.js";

export class CommandsHandler {
  constructor({ logger, commands = COMMANDS_MAP, data }) {
    if (!data) {
      throw new Error("No data provided");
    }
    this.logger = logger || console;
    this.commands = commands;
    this.data = data;
  }

  _getCommandFunc(command = "") {
    const commandName = command.trim().split(" ")[0].replaceAll(/[\W]/g, "");
    const func = this.commands[commandName];

    return func;
  }

  async handle(command) {
    const func = this._getCommandFunc(command);

    if (!func) {
      this.logger.error(ERRORS_MAP.invalid);
      return;
    }

    try {
      await func({
        logger: this.logger,
        data: this.data,
        command,
      });
    } catch (err) {
      if (err instanceof AppError) {
        this.logger.error(err);
      } else {
        this.logger.error(new AppError(ERRORS_MAP.failed));
      }
    }
  }
}
