import path from "node:path";

export const getAbsolutePath = (resourcePath) =>
  path.isAbsolute(resourcePath)
    ? resourcePath
    : path.resolve(process.cwd(), resourcePath);
