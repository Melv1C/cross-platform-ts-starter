import { prisma } from '@/prisma';
import { ExampleSchema } from '@cross-platform-ts-starter/core';
import { Request, Response, Router } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = ExampleSchema.omit({ id: true }).parse(req.body);

    const example = await prisma.example.create({
      data,
    });

    res.status(201).json(ExampleSchema.parse(example));
  } catch (error) {
    console.error('Error creating example:', error);
    res.status(400).json({ error: 'Failed to create example' });
  }
});

export default router;
