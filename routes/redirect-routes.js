const router = require('express').Router();

const User = require('../model/user');
const Site = require('../model/site');

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
    res.render('remove');
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
        res.render('main', {
            user : req.user,
            sites,
            message,
        });
    });
});

module.exports = router;