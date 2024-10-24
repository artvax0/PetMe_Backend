import chalk from "chalk"
import Cart from "../models/collections/Cart.js"
import Category from "../models/collections/Category.js"
import Order from "../models/collections/Order.js"
import Pet from "../models/collections/Pets.js"
import Product from "../models/collections/Product.js"
import User from "../models/collections/Users.js"
import { initialCarts, initialCategories, initialOrders, initialPets, initialProducts, initialUsers } from "../utils/initialData.js"

const initializeDatabase = async () => {
  try {
    console.log(chalk.bgGreen('Search database documents'));
    // search all model documents to see if they're clean
    // if relevant model document is empty - insert to database
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(initialUsers);
      console.log(chalk.green('Inserted mock user data'));
    }

    const petCount = await Pet.countDocuments();
    if (petCount === 0) {
      await Pet.insertMany(initialPets);
      console.log(chalk.green('Inserted mock pet data'));
    }

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(initialCategories);
      console.log(chalk.green('Inserted mock category data'));
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const categories = await Category.find();
      const pets = await Pet.find();

      // fill products with a linked object id
      const fixedProducts = initialProducts.map(product => {
        return {
          ...product,
          category_id: categories.find(c => c.name == product.category_id)._id,
          petType_id: product.petType_id.map(pet => pets.find(p => p.name === pet)._id),
        };
      });

      await Product.insertMany(fixedProducts);
      console.log(chalk.green('Inserted mock product data'));
    }

    const cartCount = await Cart.countDocuments();
    if (cartCount === 0) {
      const users = await User.find();
      const products = await Product.find();

      // fill carts with linked object ids
      const fixedCarts = initialCarts.map(cart => {
        return {
          ...cart,
          // will take three first users, most likely- if database is completely clean, they'll be the initial mock users
          user_id: users[cart.user_id]._id,
          products: cart.products.map(product => ({
            ...product,
            product_id: products.find(p => p.name === product.product_id)._id,
            // fix price accordingly
            price: products.find(p => p.name === product.product_id).price * product.quantity
          })),
        };
      });

      await Cart.insertMany(fixedCarts);
      console.log(chalk.green('Inserted mock cart data'));
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      const users = await User.find();
      const products = await Product.find();
      // fill orders with linked object ids
      const fixedOrders = initialOrders.map(order => {
        // set the total of order by finding the orders' products' prices, repeat for the entire orders' products array
        const total = order.products.reduce((sum, product) => {
          // find the product from products list
          const foundProduct = products.find(p => p.name === product.product_id);
          // increase the total from order's product quantity and the relevant product's price
          return sum + (foundProduct.price * product.quantity);
        }, 0);

        return {
          ...order,
          user_id: users[order.user_id]._id,
          products: order.products.map(product => ({
            ...product,
            product_id: products.find(p => p.name === product.product_id)._id,
            price: products.find(p => p.name === product.product_id).price * product.quantity
          })),
          address: users[order.user_id].address,
          total,
        };
      });
      await Order.insertMany(fixedOrders);
      const orders = await Order.find();
      // for each mock order, update said users' orders array
      for (let i = 0; i < 3; i++) {
        await User.findByIdAndUpdate(fixedOrders[i].user_id, { order_ids: orders[i]._id });
      }
      console.log(chalk.green('Inserted mock order data'));
      // if no document is empty, should result in two logs: "Search database documents" (ran before check) and "Updated mock user data order ids"
      console.log(chalk.green('Updated mock user data order ids'));
    }
    console.log(chalk.bgGreen('Database documents loaded'));
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export default initializeDatabase;