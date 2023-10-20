const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const CommentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force:true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blogPost of blogPostData) {
        await BlogPost.create({
            ...blogPost,
        })
    }

    const comments = await Comment.bulkCreate(CommentData)

    process.exit(0)
};

seedDatabase();
