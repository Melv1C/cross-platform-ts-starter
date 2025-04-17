import { prisma } from '@/prisma';
import { ExampleSchema } from '@cross-platform-ts-starter/core';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const examples = await prisma.example.findMany();
    res.json(ExampleSchema.array().parse(examples)); // Validate response with Zod schema
  } catch (error) {
    console.error('Error fetching examples:', error);
    res.status(500).json({ error: 'Failed to fetch examples' });
  }
});

export default router;
