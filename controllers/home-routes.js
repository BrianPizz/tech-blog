const router = require('express').Router();
// home page
router.get('/', async (req, res) => {

  res.render('homepage');
});

//user dashboard
router.get('/dahsboard', async (req, res) => {

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