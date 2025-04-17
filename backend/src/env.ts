import { NodeEnv } from '@cross-platform-ts-starter/core';
import { z } from 'zod';

// Define schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.Development),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url().default('http://localhost:5432'),
  CORS_ORIGIN: z.string().default('*'),
});

// Try to parse environment variables
const parsedEnv = envSchema.safeParse(process.env);

// If parsing fails, throw an error with details
if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsedEnv.error.format(), null, 4)
  );
  throw new Error('Invalid environment variables');
}

// Export validated environment variables
export const env = parsedEnv.data;