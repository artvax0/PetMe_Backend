import Category from "../models/collections/Category.js"
import config from "config";
import configError from "../utils/configError.js";
import { createError } from "../utils/handleErrors.js";

const db = config.get('DB');

// [POST]
const newCategory = async (categoryInfo) => {
  if (db == 'mongodb') {
    try {
      let findCategory = await Category.findOne({ name: categoryInfo.name });
      if (findCategory) return createError('Bad Request', Error('Category already exists'));
      let category = new Category(categoryInfo);
      category = await category.save();
      return category;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [GET]
const getCategories = async () => {
  if (db == 'mongodb') {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const getCategory = async (categoryId) => {
  if (db == 'mongodb') {
    try {
      const category = await Category.findById(categoryId);
      return category;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const getCategoryByName = async (categoryName) => {
  if (db == 'mongodb') {
    try {
      const category = await Category.findOne({ name: categoryName });
      return category;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

// [UPDATE]
const updateCategory = async (categoryId, newCategory) => {
  if (db == 'mongodb') {
    try {
      const category = await Category.findByIdAndUpdate(categoryId, newCategory, { new: true });
      return category;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

export { newCategory, getCategories, getCategory, getCategoryByName, updateCategory };