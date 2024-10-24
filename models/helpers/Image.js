import mongoose from "mongoose";
import { DEFAULT_STRING, URL } from "./validators.js";

const IMAGE = new mongoose.Schema({
  url: URL,
  alt: { ...DEFAULT_STRING, required: false, minLength: 0 },
});

export default IMAGE;