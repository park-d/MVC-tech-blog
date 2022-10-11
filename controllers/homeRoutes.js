const router = require("express").Router();
const {Post, Comment, User} = require("../models");

router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [User],
        });
        const allPosts = posts.map((post) => post.get({plain: true}));
        res.render("all-posts", {allPosts});
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;

