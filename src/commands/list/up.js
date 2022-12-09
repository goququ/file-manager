import { cd } from "./cd.js";

export const up = () => {
  cd({ command: "cd .." });
};
