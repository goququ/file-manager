import path from "node:path";
import fs from "node:fs/promises";

import { ERRORS_MAP, AppError } from "../../utils/AppError.js";

export const rn = async ({ command }) => {
  let [, oldFilePath, newFileName] = command.split(" ");

  if (!oldFilePath || !newFileName) {
    throw new AppError(ERRORS_MAP.invalid);
  }

  if (!path.isAbsolute(oldFilePath)) {
    oldFilePath = path.resolve(process.cwd(), oldFilePath);
  }

  const dirname = path.dirname(oldFilePath);
  const newFilePath = path.resolve(dirname, newFileName);

  await fs.rename(oldFilePath, newFilePath);
};
