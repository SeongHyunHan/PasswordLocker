const router = require('express').Router();
const url = require('url');

const User = require('../model/user');
const Site = require('../model/site');
const { decrypt } = require('./functions/crypto');

router.get('/newSite', (req, res) => {
    res.render('add');
});

router.get('/editSite', (req, res) => {
    const id = req.query.id;
    Site.findById(id)
    .then((site) => {
        res.render('edit', {
            id,
            site
        });
    });  
});

router.get('/removeSite', (req, res) => {
    const id = req.query.id;
    Site.destroy({
        where: {
            id
        }
    }).then((result) => {
        res.redirect(url.format({
            pathname: '/home',
            query: {
                result: 1
            }
        }));
    });
});

router.get('/home', (req, res) => {
    var result = req.query.result;
    var message = '';
    switch(result){
        case 1:
            message = 'New Site Added';
            break;
        case 2:
            message = 'Error! Could not add new site';
            break;
        case 3:
            message = 'Successfully Updated';
            break;
        case 4:
            message = 'Failed to Update';
            break;
    }
    Site.findAll({
        where: {userId: req.user.id}
    }).then((sites) => {
        if(sites.length >= 1){
            sites.forEach((site) => {
                site.password = decrypt(site.password);
            });
        }
        res.render('home', {
            user : req.user,
            sites,
            message,
        });
    });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;