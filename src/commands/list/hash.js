import crypto from "node:crypto";
import fs from "node:fs/promises";
import { AppError, ERRORS_MAP } from "../../utils/AppError.js";
import { getAbsolutePath } from "../../utils/getAbsolutePath.js";

export const hash = async ({ command, logger }) => {
  const filename = command.split(" ")[1];

  if (!filename) {
    throw new AppError(ERRORS_MAP.invalid);
  }

  const absFilename = getAbsolutePath(filename);

  const data = await fs.readFile(absFilename);
  const hex = crypto.createHash("sha256").update(data).digest("hex");

  logger.log(hex);
};
