const router = require('express').Router();
const {User} = require('../../models');

// to create a new user, we need username and password
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        // in order to stay logged in, need to make a session with loggedIn info and on the user
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
        console.log(req.session)
            ;

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// to login, we check the database for the username that is entered, and if there is not that data, send a message, otherwise check for password validity
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {username: req.body.username}});

        if(!userData) {
            res
                .status(400)
                .json({message: 'Incorrect email or password, please try again'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect email or password, please try again'});
            return;
        }

        //same as above, saving session data so user stays logged in across the website
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({user: userData, message: 'You are now logged in!'});
        });
        console.log(req.session);
    } catch(err) {
        res.status(400).json(err);
    }
});

// post route for user log out. destroying the active session if the user is logged in otherwise end
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
