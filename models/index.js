const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.hasMany(BlogPost, {
    foreignKey: 'blog_post_id',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(Comment, {
    foreignKey: 'blog_post_id'
});

module.exports = { User, BlogPost, Comment };
