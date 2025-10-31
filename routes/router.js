import express from 'express';
import {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/mediaController.js';
import { validate, mediaCreateSchema, mediaUpdateSchema } from '../middleware/validation.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllMedia);
router.get('/:id', getMediaById);

router.post('/',
  upload.single('poster'),
  (req, res, next) => {
    console.log('File upload middleware - File:', req.file);
    console.log('File upload middleware - Body:', req.body);
    next();
  },
  validate(mediaCreateSchema),
  createMedia
);

router.put('/:id',
  upload.single('poster'),
  validate(mediaUpdateSchema),
  updateMedia
);

router.delete('/:id', deleteMedia);

export default router;