import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Movie', 'TV Show'),
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  budget: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  yearTime: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'year_time',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // imageUrl: {
  //   type: DataTypes.STRING(500),
  //   allowNull: true,
  //   field: 'image_url',
  // },
}, {
  tableName: 'media',
  timestamps: true,
});

export default Media;