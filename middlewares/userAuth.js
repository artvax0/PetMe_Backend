import config from 'config'
import { createError, handleError } from '../utils/handleErrors.js';
import { verifyToken } from '../services/tokenService.js';
const tokenGen = config.get('TOKEN_GENERATOR');

const authLoggedUser = (req, res, next) => {
  try {
    if (tokenGen !== 'jwt') {
      let error = Error('You are not using a JWT generator');
      error.status = 500;
      return createError('Token Generator', error);
    }

    const authToken = req.header('auth-token');
    if (!authToken) {
      let error = Error('Please Login');
      error.status = 401;
      return createError('Authentication', error);
    }

    const user = verifyToken(authToken);
    if (!user) {
      let error = Error('Unauthorized User');
      error.status = 401;
      return createError('Authentication', error);
    }

    res.locals.user = user;
    return next();
  } catch (error) {
    return handleError(res, error);
  }
}

export default authLoggedUser;