const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LinkedInStrategy = require('passport-linkedin-oauth2');
const FacebookStrategy = require('passport-facebook');

const keys = require('./keys');
const User = require('../model/user');

//session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findAll({where: {authId: id.toString()}}).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    // options for the google strategy
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    User.findOne({where: {authId: profile.id}}).then((user) =>{
       if(user){
           done(null, user);
       }else{
            User.create({
                username: profile.displayName,
                authId: profile.id
            }).then((newUser) => {
                console.log(`new user created ${newUser}`);
                done(null, newUser);
            });
        }
    });
}));

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({where: {authId: profile.id}}).then((user) =>{
        if(user){
            done(null, user);
        }else{
            User.create({
                username: profile.displayName,
                authId: profile.id
            }).then((newUser) => {
                console.log(`new user created ${newUser}`);
                done(null, newUser);
            });
        }
    });
}
));

