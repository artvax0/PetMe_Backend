import mongoose from "mongoose";
import { DEFAULT_STRING } from "../helpers/validators.js";

const Category = mongoose.model('Category', new mongoose.Schema({
  name: DEFAULT_STRING,
  description: DEFAULT_STRING,
}, { timestamps: true }));

export default Category;