import { prisma } from '@/prisma';
import { ExampleSchema } from '@cross-platform-ts-starter/core';
import { Request, Response, Router } from 'express';

const router = Router();

router.put('/', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = ExampleSchema.omit({ id: true }).parse(req.body);

    const example = await prisma.example.update({
      where: { id },
      data,
    });

    res.json(ExampleSchema.parse(example));
  } catch (error) {
    console.error('Error updating example:', error);
    res.status(400).json({ error: 'Failed to update example' });
  }
});

export default router;
