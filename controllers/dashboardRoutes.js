const router = require("express").Router();
const {Post} = require("../models");
const withAuth = require("../utils/auth")

router.get("/", withAuth, async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });
        const allPosts = posts.map((post) => post.get({plain: true}));
        res.render("all-posts-admin", {layout: "dashboard", allPosts});
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;
