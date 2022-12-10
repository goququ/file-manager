import fs from "node:fs/promises";

const getContentType = (stats) => {
  if (stats.isFile()) {
    return "file";
  }
  if (stats.isDirectory()) {
    return "directory";
  }
  if (stats.isBlockDevice()) {
    return "block device";
  }
  if (stats.isCharacterDevice()) {
    return "character device";
  }
  if (stats.isSymbolicLink()) {
    return "symbolic link";
  }
  if (stats.isFIFO()) {
    return "FIFO";
  }
  if (stats.isSocket()) {
    return "socket";
  }
};

export const ls = async ({ logger }) => {
  const content = await fs.readdir(process.cwd());
  const tableDataPromises = content.map(async (name) => {
    const stat = await fs.lstat(name);
    const type = getContentType(stat);

    return { Name: name, Type: type };
  });
  const tableData = await Promise.all(tableDataPromises);
  const sortedData = tableData.sort((i1, i2) =>
    i1.Type.length > i2.Type.length ? -1 : 1
  );

  logger.table(sortedData);
};
