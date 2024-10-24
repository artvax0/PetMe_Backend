import Order from "../models/collections/Order.js"
import config from "config";
import configError from "../utils/configError.js";
import { createError } from "../utils/handleErrors.js";
import { updateUserOrders } from "./usersService.js";
import { getProduct, updateProductStock } from "./productsService.js";
import { cleanCart } from "./cartsService.js";

const db = config.get('DB');

// [POST]
const newOrder = async (user_id, orderDetails) => {
  if (db == 'mongodb') {
    try {
      let order = new Order({ user_id, ...orderDetails });
      // set order total to 0, create it if null
      order.total ??= 0;

      const checkStock = async () => {
        // for every product, check if the product is in stock
        for (const product of order.products) {
          const productInfo = await getProduct(product.product_id);

          if (productInfo.stock < product.quantity) {
            let error = Error(`Product ${productInfo.name} is out of stock, or insufficient quantity`);
            error.status = 400;
            return createError('Validation', error);
          }
        }
      }

      await checkStock();

      const processProducts = async () => {
        // for every product, check if it has a discount at the current moment, set price to product accordingly
        for (const product of order.products) {
          const productInfo = await getProduct(product.product_id);
          const now = new Date();
          const isDiscountValid = productInfo.discount > 0 && productInfo.discountStartDate <= now && productInfo.discountEndDate >= now;

          if (isDiscountValid) {
            product.price = productInfo.price * (1 - productInfo.discount / 100) * product.quantity
          } else {
            product.price = productInfo.price * product.quantity
          }
          let stock = productInfo.stock - product.quantity;
          await updateProductStock(product.product_id, stock);
          // update order total
          order.total += product.price;
        }
      }

      await processProducts();

      // if user provides status to a new order - that isnt processing, reject request
      if (order.status != 'Processing') {
        let error = Error('Invalid Status');
        error.status = 400;
        return createError('Bad Request', error);
      }

      order = await order.save();
      // update users' orders array 
      const userOrders = await getOrdersFromUser(order.user_id);
      await updateUserOrders(order.user_id, userOrders);
      // clean users' current cart
      await cleanCart(order.user_id);
      return order;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [GET]
const getOrders = async () => {
  if (db == 'mongodb') {
    try {
      let orders = await Order.find();
      return orders;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const getOrder = async (orderId, payload) => {
  if (db == 'mongodb') {
    try {
      let order = await Order.findById(orderId);
      if (!payload.isAdmin) {
        if (!payload.isEmployee) {
          if (order.user_id != payload._id) {
            let error = Error('Cannot view an other user order');
            error.status = 403;
            return createError('Authorization', error);
          }
        }
      }
      return order;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const getOrdersFromUser = async (user_id) => {
  if (db == 'mongodb') {
    try {
      let orders = await Order.find({ user_id });
      return orders;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [PATCH]
const changeOrderStatus = async (orderId, status) => {
  if (db == 'mongodb') {
    try {
      let order = await Order.findByIdAndUpdate(orderId, status, { new: true });
      return order;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

export { newOrder, getOrders, getOrder, getOrdersFromUser, changeOrderStatus };