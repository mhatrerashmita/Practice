import express from 'express';
import cors from 'cors';
import { routes } from "./todo/todo.route"; 
import { Mongodb } from './mongodb.connection';

const app = express();

// Enable CORS for all origins (development)
app.use(cors());

// Parse JSON body
app.use(express.json());

Mongodb();

// Register all routes from your routes array
routes.forEach(([path, config]) => {
  app.use(`/api/${path}`, config.handler);
});

// Optional: Root health check
app.get('/', (req, res) => {
  res.send('API is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
