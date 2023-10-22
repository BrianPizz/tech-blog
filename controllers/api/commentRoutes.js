const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require("../../utils/auth");

// Add comment
router.post('/', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.create({
            description: req.body.comment,
            user_id: req.session.user_id,
            blog_post_id: req.body.targetId
        });
        res.status(200).json(commentData)
    } catch (err){
        res.status(500).json(err)
    };
})

module.exports = router;