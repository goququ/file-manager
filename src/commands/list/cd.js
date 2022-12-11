import os from "node:os";

import { getAbsolutePath } from "../../utils/getAbsolutePath.js";
import { AppError, ERRORS_MAP } from "../../utils/AppError.js";

export const cd = ({ command }) => {
  let argsPath = command.split(" ")[1];

  if (!argsPath) {
    throw new AppError(ERRORS_MAP.invalid);
  }

  argsPath = getAbsolutePath(argsPath);

  const homedir = os.homedir();

  if (argsPath.startsWith(homedir)) {
    process.chdir(argsPath);
  }
};
