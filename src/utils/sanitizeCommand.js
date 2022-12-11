export const sanitizeCommand = (str) =>
  str.trim().split(" ").filter(Boolean).join(" ");
