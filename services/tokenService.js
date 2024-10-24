import 'dotenv/config'
import config from 'config'
import jwt from 'jsonwebtoken'
import configError from '../utils/configError.js';

const tokenGen = config.get('TOKEN_GENERATOR');

const generateAuthToken = ({ _id, isEmployee, isAdmin }) => {
  if (tokenGen == 'jwt') {
    const token = jwt.sign({ _id, isEmployee, isAdmin }, process.env.SECRET_KEY);
    return token;
  }
  return configError('tokenGen');
}

const verifyToken = (token) => {
  if (tokenGen == 'jwt') {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      return payload;
    } catch (error) {
      return null;
    }
  }
  return configError('tokenGen');
}

export { generateAuthToken, verifyToken };