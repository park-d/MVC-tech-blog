const router = require("express").Router();
const {Post} = require("../models");
const withAuth = require("../utils/auth");

// get route to find all posts by the user on the dashboard page
router.get("/", withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });
        //because of the way sequelize returns data, we have to trim unwanted formatting (nested objects) with plain: true
        const posts = allPosts.map((post) => post.get({plain: true}));
        // rendering the all-posts-admin handlebars view with the dashboard layout and passing the reformatted data to it
        res.render("all-posts-admin", {layout: "dashboard", posts});
    } catch(err) {
        res.status(400).json(err);
    }
});
// get route to render the new-post handlebars view with the dashboard layout
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {layout: 'dashboard'});
});

// get route to render the edit-post handlebars view with the dashboard layout and passing reformatted post data to it
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
