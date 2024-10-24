import { createError } from "./handleErrors.js";

const configError = (errorType) => {
  let error;
  switch (errorType) {
    case 'db':
      error = Error('There is no database for this request');
      error.status = 500;
      return createError('Database', error);

    case 'tokenGen':
      error = Error('There is no token generator for this request');
      error.status = 500;
      return createError('Token Generator', error);


    case 'validator':
      error = Error('There is no validator for this request');
      error.status = 500;
      return createError('Validator', error);

    default:
      break;
  }
}

export default configError;