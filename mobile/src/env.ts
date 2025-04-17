import { NodeEnv } from '@cross-platform-ts-starter/core';
import { API_BASE_URL, NODE_ENV } from '@env';
import { z } from 'zod';

const envVars = {
  NODE_ENV: NODE_ENV,
  API_BASE_URL: API_BASE_URL,
};

// Define schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.Development),
  API_BASE_URL: z.string().url().default('http://localhost:3000'),
});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(envVars);

// If parsing fails, throw an error with details
if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsedEnv.error.format(), null, 4),
  );
  throw new Error('Invalid environment variables');
}

// Export validated environment variables
export const env = parsedEnv.data;
