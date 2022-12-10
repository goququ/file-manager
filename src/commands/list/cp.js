import fs from "node:fs";
import stream from "node:stream";
import util from "node:util";

import { getAbsolutePath } from "../../utils/getAbsolutePath.js";
import { AppError, ERRORS_MAP } from "../../utils/AppError.js";

const finished = util.promisify(stream.finished);

export const cp = async ({ command }) => {
  let [, source, dest] = command.split(" ");

  if (!source || !dest) {
    throw new AppError(ERRORS_MAP.invalid);
  }

  source = getAbsolutePath(source);
  dest = getAbsolutePath(dest);

  const sourceReadStream = fs.createReadStream(source, { flags: "r" });
  const writableStream = fs.createWriteStream(dest, { flags: "wx" });

  sourceReadStream.pipe(writableStream);

  await Promise.all([finished(sourceReadStream), finished(writableStream)]);

  sourceReadStream.destroy();
  writableStream.destroy();
};
