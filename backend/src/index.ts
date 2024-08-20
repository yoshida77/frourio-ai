import express, { type Request, type Response } from 'express';
import { ExpressAuth } from '@auth/express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { authConfig } from './config/auth.config.js';
import { errorHandler, errorNotFoundHandler } from './middleware/error.middleware.js'
import { authenticatedUser, currentSession } from './middleware/auth.middleware.js';

export const app = express();

app.set("trust proxy", true)

// TODO: set logger

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Authentication setup
app.use("/auth/*", ExpressAuth(authConfig));

// Routes
app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});

// Error handlers
app.use(errorNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
