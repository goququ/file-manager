import fs from "node:fs/promises";
import { AppError, ERRORS_MAP } from "../../utils/AppError.js";

export const add = async ({ command }) => {
  const filename = command.split(" ")[1];

  if (!filename) {
    throw new AppError(ERRORS_MAP.invalid);
  }

  await fs.writeFile(filename, "", { flag: "ax+" });
};
