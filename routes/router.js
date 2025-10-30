import express from 'express';
import {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/mediaController.js';
import { validate, mediaCreateSchema, mediaUpdateSchema } from '../middleware/validation.js';

const router = express.Router();

// router.use((req, res, next) => {
//   console.log('=== REQUEST DEBUG ===');
//   console.log('Method:', req.method);
//   console.log('URL:', req.url);
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);
//   console.log('=== END DEBUG ===');
//   next();
// });

router.get('/', getAllMedia);
router.get('/:id', getMediaById);
router.post('/', validate(mediaCreateSchema), createMedia);
router.put('/:id', validate(mediaUpdateSchema), updateMedia);
router.delete('/:id', deleteMedia);

export default router;