import { Router } from 'express';
import createExampleRouter from './createExample';
import deleteExampleRouter from './deleteExample';
import getExampleRouter from './getExample';
import listExamplesRouter from './listExamples';
import updateExampleRouter from './updateExample';

const router = Router();

router.use('/examples', [
  createExampleRouter,
  deleteExampleRouter,
  getExampleRouter,
  listExamplesRouter,
  updateExampleRouter,
]);

export default router;
