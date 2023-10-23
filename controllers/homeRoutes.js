const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

const router = require('express').Router();
// home page
router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: User
    });

    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

//specific post with comments
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch the blog post
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: User,
        },
        {
          model: User,
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    // check if the logged in user is the owner of the comment
    const commentsData = await Comment.findAll({
      where: {
        blog_post_id: req.params.id,
      },
      include: User,
    });

    // add boolean value to comments to see if the user made them
    const comments = commentsData.map((comment) => {
      const isOwner = comment.user_id === req.session.user_id;
      return {
        ...comment.get({ plain: true }),
        isOwner,
      };
    });

    res.render('blogPost', {
      blogPost,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// login page
router.get('/login', async (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
})

module.exports = router;