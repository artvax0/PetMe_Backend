import Product from "../models/collections/Product.js"
import config from "config";
import configError from "../utils/configError.js";
import { createError } from "../utils/handleErrors.js";

const db = config.get('DB');

// [POST]
const newProduct = async (productInfo) => {
  if (db == 'mongodb') {
    try {
      let product = new Product(productInfo);
      product = await product.save();
      return product;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [GET]
const getProducts = async () => {
  if (db == 'mongodb') {
    try {
      let products = await Product.find();
      return products;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const getProduct = async (productId) => {
  if (db == 'mongodb') {
    try {
      let product = await Product.findById(productId);
      return product;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [PUT]
const updateProduct = async (productId, newProduct) => {
  if (db == 'mongodb') {
    try {
      let product = await Product.findByIdAndUpdate(productId, newProduct, { new: true });
      return product;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [PATCH]
const updateProductStock = async (productId, stock) => {
  if (db == 'mongodb') {
    try {
      if (stock < 0) return createError('Bad Request', Error('Invalid quantity'));
      let product = await Product.findByIdAndUpdate(productId, { stock: stock }, { new: true });
      return product;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [DELETE]
const deleteProduct = async (productId) => {
  if (db == 'mongodb') {
    try {
      let product = await Product.findByIdAndDelete(productId);
      return product;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

export { newProduct, getProducts, getProduct, updateProduct, updateProductStock, deleteProduct };