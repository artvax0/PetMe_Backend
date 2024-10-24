import mongoose from "mongoose";
import { DEFAULT_STRING } from "./validators.js";

const ADDRESS = new mongoose.Schema({
  country: DEFAULT_STRING,
  state: { type: String, maxLength: 256, trim: true },
  city: DEFAULT_STRING,
  street: DEFAULT_STRING,
  houseNumber: { type: Number, required: true, min: 1, default: 1 },
  zip: { type: Number, required: true, min: 0, default: 0 },
})

export default ADDRESS;