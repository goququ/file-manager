export const exit = ({ logger, state }) => {
  logger.log(
    `\n\nThank you for using File Manager, ${state.username}, goodbye!\n`
  );

  process.exit(0);
};
