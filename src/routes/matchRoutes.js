import express from 'express';
import { verifyAdminUser } from './middlewares.js';
import { getMatches, deleteMatch, createMatch, updateMatch, upsertPrediction, removePrediction } from '../services/matchService.js';

const router = express.Router();

router
  .route('')
  .get(getMatches)
  .post(createMatch)
  .put(updateMatch)
  .delete(verifyAdminUser, deleteMatch);

router
  .route('/predictions')
  .put(upsertPrediction)
  .delete(verifyAdminUser, removePrediction);

export default router;
