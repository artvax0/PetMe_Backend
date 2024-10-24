import chalk from "chalk";

const createError = (validator, error) => {
  error.status = error.status || 400;
  error.validator = error.validator || validator;
  throw error;
}

const handleError = (res, { validator, message = '', status = 400 }) => {
  if (validator) {
    message = `${validator} Error: ${message}`;
  }

  console.log(chalk.redBright(message));
  return res.status(status).send(message);
}

export { createError, handleError };