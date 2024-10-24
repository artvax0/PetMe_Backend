import mongoose from "mongoose";
import ADDRESS from "../helpers/Address.js";

const Order = mongoose.model('Order', new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, min: 1, required: true },
    price: { type: Number, required: true },
  }],
  total: { type: Number },
  address: ADDRESS,
  status: { type: String, enum: ['Processing', 'En Route', 'Complete', 'Cancelled'], default: 'Processing' }
}, { timestamps: true }));

export default Order;