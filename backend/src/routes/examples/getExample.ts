import { prisma } from '@/prisma';
import { ExampleSchema } from '@cross-platform-ts-starter/core';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const example = await prisma.example.findUnique({
      where: { id },
    });

    if (!example) {
      res.status(404).json({ error: 'Example not found' });
      return;
    }

    res.json(ExampleSchema.parse(example));
  } catch (error) {
    console.error('Error fetching example:', error);
    res.status(500).json({ error: 'Failed to fetch example' });
  }
});

export default router;
