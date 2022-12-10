import path from "node:path";
import os from "node:os";
import { sanitizeString } from "../../utils/sanitizeString.js";
import { AppError, ERRORS_MAP } from "../../utils/AppError.js";

export const cd = ({ command, logger }) => {
  const argsPath = command.split(" ")[1];

  if (!argsPath) {
    throw new AppError(ERRORS_MAP.invalid);
  }

  let sanitizedPath = sanitizeString(argsPath);

  if (!path.isAbsolute(sanitizedPath)) {
    sanitizedPath = path.resolve(process.cwd(), sanitizedPath);
  }

  const homedir = os.homedir();

  if (sanitizedPath.startsWith(homedir)) {
    process.chdir(sanitizedPath);
  }
};
