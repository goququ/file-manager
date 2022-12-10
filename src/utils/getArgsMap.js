export const getArgsMap = (arr, defaults = {}) => {
  const args = arr.reduce((acc, arg, index, arr) => {
    if (arg.startsWith("--")) {
      const key = arg.replace("--", "");
      const nextArg = arr[index + 1];

      acc[key] = !nextArg || nextArg.startsWith("--") ? true : nextArg;
    }
    return acc;
  }, defaults);

  return args;
};
