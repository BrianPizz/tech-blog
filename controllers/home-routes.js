const { BlogPost, User, Comment } = require('../models');

const router = require('express').Router();
// home page
router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: User
    });

    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', { blogPosts });
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

    res.render('blogPost', {
      blogPost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//user dashboard
router.get('/dashboard', async (req, res) => {

  try {
    res.render('dashboard');
  } catch (err) {
    res.status(500).json(err)
  }
})

// login page
router.get('/login', async (req, res) => {

  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('login');
})

module.exports = router;