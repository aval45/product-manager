import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Product = mongoose.model('Product', productSchema);
