export const exit = ({ logger, data }) => {
  logger.log(
    `\nThank you for using File Manager, ${data.username}, goodbye!\n`
  );

  process.exit(0);
};
