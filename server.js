import http from 'http';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { handleRequest } from './app.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
