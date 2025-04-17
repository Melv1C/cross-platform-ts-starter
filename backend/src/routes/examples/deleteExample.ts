import { prisma } from '@/prisma';
import { Request, Response, Router } from 'express';

const router = Router();

router.delete('/', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.example.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting example:', error);
    res.status(400).json({ error: 'Failed to delete example' });
  }
});

export default router;
