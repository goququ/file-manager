import fs from "node:fs";
import stream from "node:stream/promises";
import zlib from "node:zlib";

import { AppError, ERRORS_MAP } from "../../utils/AppError.js";
import { getAbsolutePath } from "../../utils/getAbsolutePath.js";

export const compress = async ({ command }) => {
  let [, source, dest] = command.split(" ");

  if (!source || !dest) {
    throw new AppError(ERRORS_MAP.invalid);
  }

  source = getAbsolutePath(source);
  dest = getAbsolutePath(dest);

  const sourceReadStream = fs.createReadStream(source, { flag: "r" });
  const writeStream = fs.createWriteStream(dest, { flag: "wx" });

  await stream.pipeline(
    sourceReadStream,
    zlib.createBrotliCompress(),
    writeStream
  );
};
