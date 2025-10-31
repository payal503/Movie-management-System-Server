import Media from '../models/Media.js';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination.js';

export const getAllMedia = async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const offset = (page - 1) * limit;

    const { count, rows } = await Media.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const response = createPaginatedResponse(rows, count, { page, limit });
    
    res.json({
      success: true,
      ...response,
    });
  } catch (error) {
    next(error);
  }
};

export const getMediaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await Media.findByPk(id);

    if (!media) {
      return res.status(404).json({
        success: false,
        error: 'Media not found',
      });
    }

    res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const createMedia = async (req, res, next) => {
  try {
    const mediaData = {
      title: req.body.title,
      type: req.body.type,
      director: req.body.director,
      budget: req.body.budget,
      location: req.body.location,
      duration: req.body.duration,
      year_time: req.body.year_time,
      description: req.body.description || null,
    };

    if (req.file) {
      mediaData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const media = await Media.create(mediaData);

    res.status(201).json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMedia = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      type: req.body.type,
      director: req.body.director,
      budget: req.body.budget,
      location: req.body.location,
      duration: req.body.duration,
      year_time: req.body.year_time,
      description: req.body.description || null,
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const media = await Media.findByPk(id);

    if (!media) {
      return res.status(404).json({
        success: false,
        error: 'Media not found',
      });
    }

    await media.update(updateData);

    res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await Media.findByPk(id);

    if (!media) {
      return res.status(404).json({
        success: false,
        error: 'Media not found',
      });
    }

    await media.destroy();

    res.json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};