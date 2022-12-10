import { exit } from "./list/exit.js";
import { up } from "./list/up.js";
import { cd } from "./list/cd.js";
import { rn } from "./list/rn.js";
import { ls } from "./list/ls.js";
import { cat } from "./list/cat.js";
import { add } from "./list/add.js";
import { cp } from "./list/cp.js";
import { rm } from "./list/rm.js";
import { mv } from "./list/mv.js";

export const COMMANDS_MAP = {
  exit,
  up,
  cd,
  ls,
  cat,
  add,
  rn,
  cp,
  rm,
  mv,
  os: "",
  hash: "",
  compress: "",
  decompress: "",
};
