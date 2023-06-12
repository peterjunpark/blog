const { Comment, Post, User } = require('../models/');

User.hasMany(Post, { foreignKey: 'user_id', onDelete: 'SET NULL' });
Post.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'SET NULL' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id', onDelete: 'CASCASE' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = {
  Comment,
  Post,
  User,
};
