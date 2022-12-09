export const getArgsMap = (defaults = {}) => {
  const args = process.argv.slice(2).reduce((acc, arg, index, arr) => {
    if (arg.startsWith("--")) {
      const key = arg.replace("--", "");
      acc[key] = arr[index + 1];
    }
    return acc;
  }, defaults);

  return args;
};
