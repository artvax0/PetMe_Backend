import mongoose from "mongoose";

const Pet = mongoose.model('Pet', new mongoose.Schema({
  name: { type: String, required: true, unique: true, enum: ['Dogs', 'Cats', 'Birds', 'Fish', 'Rodents', 'Reptiles'] },
}, { timestamps: true }));

export default Pet;