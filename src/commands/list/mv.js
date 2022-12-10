import { rm } from "./rm.js";
import { cp } from "./cp.js";

export const mv = async ({ command }) => {
  let [, source, dest] = command.split(" ");

  await cp({ command: `cp ${source} ${dest}` });
  await rm({ command: `rm ${source}` });
};
