import config from 'config';
import registerUserSchema from './schemas/registerUserSchema.js';
import configError from '../utils/configError.js';
import loginUserSchema from './schemas/loginUserSchema.js';
import newProductSchema from './schemas/newProductSchema.js';
import productSchema from './schemas/productSchema.js';
import orderSchema from './schemas/orderSchema.js';
import categorySchema from './schemas/categorySchema.js';
import cartSchema from './schemas/cartSchema.js';
import userSchema from './schemas/userSchema.js';

const validator = config.get('VALIDATOR');

const validateRegistry = (user) => {
  if (validator === 'joi') {
    const { error } = registerUserSchema(user);
    if (error) return error.details[0].message;
    return '';
  }
  return configError('validator');
}

const validateUser = (user) => {
  if (validator === 'joi') {
    const { error } = userSchema(user);
    if (error) return error.details[0].message;
    return '';
  }
  return configError('validator');
}

const validateLogin = (user) => {
  if (validator === 'joi') {
    const { error } = loginUserSchema(user);
    if (error) return error.details[0].message;
    return ''
  }
  return configError('validator');
}

const validateNewProduct = (product) => {
  if (validator === 'joi') {
    const { error } = newProductSchema(product);
    if (error) return error.details[0].message;
    return ''
  }
  return configError('validator');
}

const validateProduct = (product) => {
  if (validator === 'joi') {
    const { error } = productSchema(product);
    if (error) return error.details[0].message;
    return ''
  }
  return configError('validator');
}

const validateOrder = (order) => {
  if (validator === 'joi') {
    const { error } = orderSchema(order);
    if (error) return error.details[0].message;
    return ''
  }
  return configError('validator');
}

const validateCategory = (category) => {
  if (validator === 'joi') {
    const { error } = categorySchema(category);
    if (error) return error.details[0].message;
    return ''
  }
  return configError('validator');
}

const validateCart = (cart) => {
  if (validator === 'joi') {
    const { error } = cartSchema(cart);
    if (error) return error.details[0].message;
    return ''
  }
  return configError('validator');
}

export { validateRegistry, validateUser, validateLogin, validateNewProduct, validateProduct, validateOrder, validateCategory, validateCart };