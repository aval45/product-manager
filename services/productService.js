import { Product } from '../models/productModel.js';

export const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

export const getProducts = async (query) => {
  const { category, sortBy, inStock } = query;
  let filter = {};
  if (category) filter.category = category;
  if (inStock !== undefined) filter.inStock = inStock === 'true';

  let products = Product.find(filter);
  if (sortBy) {
    const [key, order] = sortBy.split(':');
    products = products.sort({ [key]: order === 'desc' ? -1 : 1 });
  }

  return await products.exec();
};

export const getProductById = async (id) => {
  return await Product.findById(id);
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
