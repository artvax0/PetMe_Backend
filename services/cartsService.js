import _ from 'lodash'
import config from "config";
import Cart from "../models/collections/Cart.js"
import { createError } from "../utils/handleErrors.js";
import { getProduct } from "./productsService.js";
import configError from '../utils/configError.js';

const db = config.get('DB');

// [POST]
const createCart = async (user_id) => {
  if (db == 'mongodb') {
    try {
      if (await Cart.findOne({ user_id })) {
        let error = Error('Not Allowed');
        error.status = 405;
        return createError('Method', error);
      }
      let cart = new Cart({ user_id, products: [] });
      cart = await cart.save()
      return cart;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [GET]
const getCart = async (user_id) => {
  if (db == 'mongodb') {
    try {
      let cart = await Cart.findOne({ user_id });

      // update products array if discord still applies or is in stock
      const updatedProducts = await Promise.all(cart.products.map(async (product) => {
        // get product info
        const productInfo = await getProduct(product.product_id);
        // check if discount is valid
        const now = new Date();
        const isDiscountValid = productInfo.discount > 0 && productInfo.discountStartDate <= now && productInfo.discountEndDate >= now;
        // check if product is in stock
        product.isStocked = productInfo.stock >= product.quantity;
        product.product_id = product.product_id;

        if (isDiscountValid) {
          product.price = productInfo.price * (1 - productInfo.discount / 100) * product.quantity
        } else {
          product.price = productInfo.price * product.quantity
        }
        return product;
      }))
      cart.products = updatedProducts;
      return cart;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [PATCH]
const addToCart = async (user_id, { product_id, quantity }) => {
  if (db == 'mongodb') {
    try {
      // get product info
      const product = await getProduct(product_id);

      // check if product is in stock
      if (product.stock < quantity) {
        let error = Error('Invalid quantity');
        error.status = 400;
        return createError('Bad Request', error);
      }

      let cart = await Cart.findOne({ user_id });

      const now = new Date();
      const isDiscountValid = product.discount > 0 && product.discountStartDate <= now && product.discountEndDate >= now;

      // check if the product exists
      let productIndex = cart.products.findIndex(produce => produce.product_id == product_id);

      // set quantity and price of product if it exists and product quantity is above 0
      if (productIndex >= 0 && quantity) {
        cart.products[productIndex].quantity = quantity;
        if (isDiscountValid) {
          cart.products[productIndex].price = product.price * (1 - product.discount / 100) * quantity;
        } else {
          cart.products[productIndex].price = product.price * quantity;
        }
      }
      // remove product from the cart if product quantity is 0
      if (productIndex >= 0 && !quantity) {
        cart.products = cart.products.filter(product => product.product_id != product_id);
      };

      // set product if doesnt exist in cart
      if (productIndex == -1 && quantity) {
        cart.products = [...cart.products, {
          product_id,
          quantity,
          price: product.price * (1 - product.discount / 100) * quantity
        }];
      }

      // fail-safe: in-case product doesnt exist in cart and quantity is 0
      if (productIndex == -1 && !quantity) {
        let error = Error('Invalid Quantity');
        error.status = 400;
        return createError('Bad Request', error);
      }

      cart = await cart.save();
      return cart;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const cleanCart = async (user_id) => {
  if (db === 'mongodb') {
    try {
      let cart = await Cart.findOneAndUpdate({ user_id }, { products: [] }, { new: true });
      return cart;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

export { createCart, getCart, addToCart, cleanCart };