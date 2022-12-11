export const exit = ({ logger, data }) => {
  logger.log(
    `\n\nThank you for using File Manager, ${data.username}, goodbye!`
  );

  process.exit(0);
};
