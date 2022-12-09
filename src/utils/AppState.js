import os from "node:os";
import { getArgsMap } from "./getArgsMap.js";

const { username } = getArgsMap({ username: "Unknown User" });

export class AppState {
  constructor() {
    this.username = username;
  }

  get cwd() {
    return process.cwd();
  }
}
