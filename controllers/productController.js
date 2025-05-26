import { parseBody } from '../utils/parseBody.js';
import { createProduct, getProducts, getProductById, deleteProduct } from '../services/productService.js';
import { productSchema } from '../validations/productValidation.js';

export const productController = async (req, res) => {
  const { method, url } = req;

  if (url === '/products' && method === 'POST') {
    req.body = parseBody(req);
    try {
      const body = await req.body;
      await productSchema.validateAsync(body);
      const product = await createProduct(body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(product));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  if (url.startsWith('/products') && method === 'GET') {
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const products = await getProducts(Object.fromEntries(query.entries()));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(products));
  }

  if (url.match(/^\/products\/[\w\d]+$/) && method === 'GET') {
    const id = url.split('/')[2];
    const product = await getProductById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Product not found' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(product));
  }

  if (url.match(/^\/products\/[\w\d]+$/) && method === 'DELETE') {
    const id = url.split('/')[2];
    const product = await deleteProduct(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Product not found' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Product deleted' }));
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
};
