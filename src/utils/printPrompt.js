export const printPrompt = ({ logger, state }) => {
  logger.log(`\nYou are currently in ${process.cwd()}`);
  process.stdout.write(`[${state.username}] # `);
};
