import * as yup from 'yup';

export const mediaCreateSchema = yup.object({
  title: yup.string().required('Title is required').max(255),
  type: yup.string().oneOf(['Movie', 'TV Show']).required('Type is required'),
  director: yup.string().required('Director is required').max(255),
  budget: yup.string().required('Budget is required').max(100),
  location: yup.string().required('Location is required').max(255),
  duration: yup.string().required('Duration is required').max(100),
  yearTime: yup.string().required('Year/Time is required').max(100),
  description: yup.string().max(1000),
  imageUrl: yup.string().url().optional(),
});

export const mediaUpdateSchema = yup.object({
  title: yup.string().max(255),
  type: yup.string().oneOf(['Movie', 'TV Show']),
  director: yup.string().max(255),
  budget: yup.string().max(100),
  location: yup.string().max(255),
  duration: yup.string().max(100),
  yearTime: yup.string().max(100),
  description: yup.string().max(1000),
  imageUrl: yup.string().url().optional(),
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors,
    });
  }
};