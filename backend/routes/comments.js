import express from 'express';
import { getComments } from '../controllers/commentController.js';

const router = express.Router();

// GET /api/comments/:comicId/:chapterId
// Fetch all comments for a specific comic chapter
router.get('/:comicId/:chapterId', getComments);

export default router;
