const router = require('express').Router();

//check if user authenticated if not send back to login page
const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        res.redirect('/');
    }else{
        // if logged in
        next();
    }
}; 

router.get('/', authCheck, (req, res) => {
    res.render('main', {
        user: req.user
    });
});

module.exports = router;