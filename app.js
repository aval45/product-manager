import { productController } from './controllers/productController.js';

export const handleRequest = async (req, res) => {
  if (req.url.startsWith('/products')) {
    return productController(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Invalid endpoint' }));
};
