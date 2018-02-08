const passport = require('passport');
const router = require('express').Router();

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    //res.send(req.user);
    res.redirect('/main')
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/main');
});


module.exports = router;