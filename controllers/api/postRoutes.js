const router = require('express').Router();
const {Post} = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    const postBody = req.body;
    try {
        const newPost = await Post.create({...postBody, userId: req.session.userId});
        res.json(newPost);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update({title: req.body.title, body: req.body.body}, {
            where: {
                id: req.params.id,
            },
        });

        if(!updatePost ) {
            res.status(404).json({
                message: 'No post found with this id'
            }).end();
        } else {
           res.json(updatePost)
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
