const sequelize = require('../config/connection');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const comments = require('./comments-seed.json');
const posts = require('./posts-seed.json');
const users = require('./users-seed.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    // Model.bulkCreate() ignores hooks. Use loops to use Model.create() instead
    // To hash passwords before injecting into db
    for (const user of users) {
      await User.create(user);
    }

    for (const post of posts) {
      await Post.create(post);
    }

    for (const comment of comments) {
      await Comment.create(comment);
    }

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
