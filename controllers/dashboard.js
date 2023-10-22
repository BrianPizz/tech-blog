const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

//user dashboard
router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: BlogPost, include: [User] }],
      });
  
      const user = userData.get({ plain: true});
  
      res.render('dashboard',{
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err)
    }
  });

  // user post
  router.get('/:d', withAuth, async (req,res) => {
    try{
        const userPostData = await BlogPost.findByPk(req.params.id);
    } catch (err){
        res.status(500).json(err);
    };
  });

module.exports = router;