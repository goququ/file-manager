import nodeOs from "node:os";
import { getArgsMap } from "../../utils/getArgsMap.js";

const formatHzToGHz = (hz) => `${(hz / 1000).toFixed(2)}GHz`;
const getEOL = () => nodeOs.EOL;
const getCpus = () => {
  const data = nodeOs.cpus().map((i) => ({
    model: i.model,
    speed: formatHzToGHz(i.speed),
  }));
  return JSON.stringify({ overall: data.length, data }, null, 2);
};
const getHomedir = () => nodeOs.homedir();
const getUsername = () => nodeOs.userInfo({ encoding: "utf8" }).username;
const getArchitecture = () => nodeOs.arch();

const ARGS_MAP = new Map([
  ["EOL", getEOL],
  ["cpus", getCpus],
  ["homedir", getHomedir],
  ["username", getUsername],
  ["architecture", getArchitecture],
]);

export const os = async ({ command, logger }) => {
  const args = command.split(" ").slice(1);
  const argsMap = getArgsMap(args);

  for (let arg in argsMap) {
    if (ARGS_MAP.has(arg)) {
      const data = ARGS_MAP.get(arg)();

      logger.log(`${arg}: ${data}`);
    }
  }
};
