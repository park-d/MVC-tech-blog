const router = require("express").Router();
const {Post, Comment, User} = require("../models");

// this get route for the homepage takes all of the posts in the post database, includes the user info. 
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [User],
        });
        //because of the way sequelize returns data, we have to trim unwanted formatting (nested objects) with plain: true
        const posts = allPosts.map((post) => post.get({plain: true}));
        // rendering the all-posts handlebars view and passing the reformatted data to it
        res.render("all-posts", {posts});
    } catch(err) {
        res.status(500).json(err);
    }
});
// get route so see the post that is clicked on, on the homepage
router.get('/post/:id', async (req, res) => {
    //finding data based on params, including user, comment for the post
    try {
        const thePost = await Post.findByPk(req.params.id, {
            include: [User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        //if the post exists then do the following
        if(thePost) {
            //because of the way sequelize returns data, we have to trim unwanted formatting (nested objects) with plain: true
            const post = thePost.get({plain: true});
            // rendering the single-post handlebars view and passing the reformatted data to it
            res.render('single-post', {post});
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// login get route, if the user is logged in, redirect the page to the homepage, if not, then render the login page
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// login get route, if the user is logged in, redirect the page to the homepage, if not, then render the sign-up page
router.get("/signup", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;

