import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import mediaRoutes from './routes/router.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { ensureUploadsDir } from './utils/fileUtils.js'; // Add this import

import './models/Media.js';

dotenv.config();

ensureUploadsDir();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json({ 
  limit: '10mb',
}));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use('/api/media', mediaRoutes);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    try {
      const [results] = await sequelize.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'media' 
        AND COLUMN_NAME = 'image_url'
      `);

      if (results.length === 0) {
        console.log('🔄 Adding image_url column to media table...');
        await sequelize.query(`
          ALTER TABLE media 
          ADD COLUMN image_url VARCHAR(500) NULL
        `);
        console.log('✅ image_url column added successfully.');
      }
    } catch (error) {
      console.log('ℹ️  image_url column already exists or error:', error.message);
    }

    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

export default app;