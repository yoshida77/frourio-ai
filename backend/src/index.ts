import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ExpressAuth } from '@auth/express';
import { GoogleProfile } from '@auth/express/providers/google';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));
app.use(express.json());

app.use("/*", ExpressAuth({providers: [GoogleProfile]}));

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
