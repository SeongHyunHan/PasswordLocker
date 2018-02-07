const passport = require('passport');

// auth with google
app.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
app.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user);
    res.redirect('/profile')
});

// auth with facebook
app.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
app.get('/facebook/redirect', passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/');
});


module.exports = router;