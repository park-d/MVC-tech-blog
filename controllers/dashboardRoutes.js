const router = require("express").Router();
const {Post} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });
        const posts = allPosts.map((post) => post.get({plain: true}));
        res.render("all-posts-admin", {layout: "dashboard", posts});
    } catch(err) {
        res.status(400).json(err);
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {layout: 'dashboard'});
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const thePost = await Post.findByPk(req.params.id);

        if(thePost) {
            const post = thePost.get({plain: true});

            res.render('edit-post', {layout: 'dashboard', post});
        }
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;
