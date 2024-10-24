import mongoose from "mongoose";
import { DEFAULT_STRING } from "./validators.js";

const NAME = new mongoose.Schema({
  first: DEFAULT_STRING,
  middle: {
    ...DEFAULT_STRING,
    required: false,
    minLength: 0,
  },
  last: DEFAULT_STRING,
});

export default NAME;