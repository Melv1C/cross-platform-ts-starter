import { prisma } from '@/prisma';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { env } from './env';
import apiRoutes from './routes';

dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(
  cors({
    origin: env.CORS_ORIGIN, // Allow all origins by default, can be overridden by env variable
  }),
);
app.use(express.json());

// Use API routes
app.use('/api', apiRoutes);

// Start the server
app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
