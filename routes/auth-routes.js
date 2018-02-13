const passport = require('passport');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const session = require('express-session');

const User = require('../model/user');

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    res.redirect('/home')
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook', {failureRedirect: '/'}), (req, res) => {
    console.log(req);
    res.redirect('/home');
});

router.get('/local', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const saleRound = 10;

    User.findOne({
        where : {
            username,
        }
    }).then((user) => {
        if(!user){
            return res.redirect('/');
        }
        bcrypt.compare(password, user.password).then((res) => {
            if(res == true){
                req.session.user = user;
                res.redirect('/home');
            }else{
                res.redirect('/');
            }
        })
    })
});


module.exports = router;