const router = require("express").Router();
const {Post, Comment, User} = require("../models");

router.get("/", async (req, res) => {
    const posts = await Post.findAll({
        include: [User],
    });
    const allPosts = posts.map((post) => post.get({plain: true}));
    res.render("all-posts", {allPosts});
});

module.exports = router;

