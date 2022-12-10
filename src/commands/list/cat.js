import fs from "node:fs";
import stream from "node:stream";
import util from "node:util";

import { AppError, ERRORS_MAP } from "../../utils/AppError.js";

const finished = util.promisify(stream.finished);

export const cat = async ({ command }) => {
  const filepath = command.split(" ")[1];

  if (!filepath) {
    throw new AppError(ERRORS_MAP.invalid);
  }

  const stream = fs.createReadStream(filepath);

  stream.pipe(process.stdout);

  await finished(stream);

  stream.destroy();
};
