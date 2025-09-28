import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'messages',
  timestamps: true,
});

Message.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Message, { foreignKey: 'userId' });

export default Message;
