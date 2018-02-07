const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LinkedInStrategy = require('passport-linkedin-oauth2');
const FacebookStrategy = require('passport-facebook');

const keys = require('./keys');

//session
passport.serializeUser();

passport.deserializeUser();

passport.use(new GoogleStrategy({
    // options for the google strategy
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    res.send(profile);
}));

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect'
}, (accessToken, refreshToken, profile, cb) => {

}
));

