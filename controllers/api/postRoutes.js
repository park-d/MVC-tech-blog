const router = require('express').Router();
const {Post} = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    const postBody = req.body;
    try {
        const newPost = await Post.create({...postBody, userId: req.session.userId});
        res.json(newPost);
    } catch(err) {
        res.status(500).json(err);
    }
});
