export class AppLogger {
  logger = console;
  constructor(logger) {
    if (logger) {
      this.logger = logger;
    }
  }

  log = this.logger.log;
  error = this.logger.error;
  table = this.logger.table;
}
