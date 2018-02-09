const router = require('express').Router();

const User = require('../model/user');
const Site = require('../model/site');

router.post('/', (req, res) => {
    const method = req.body._method;

    switch(method){
        case 'post':
            res.redirect('/write');
            break;
        case 'get':
            res.redirect('/read');
            break;
        case 'patch':
            res.redirect('/update');
            break;
        case 'delete':
            res.redirect('/delete');
            break;
    }
});

router.post('/write', (req, res) => {
    Site.create({
        siteURL: req.body.siteURL,
        siteId: req.body.siteId,
        password: req.body.password,
        userId: req.user.id
    }).then((user) => {
        console.log({user});
        res.render('main', {
            user
        });
    });
});

router.patch('/update', (req, res) => {
    Site.update({
        siteURL: req.body.siteURL,
        siteId: req.body.siteId,
        password: req.body.password
    },{
        where: {
            id: req.body.id
        }
    }).then((result) => {
        console.log(result);
    })
});

router.get('/read', (req, res) => {
    Site.findById(req.query.id)
    .then((site) => {
        console.log(site);
    });
});

router.delete('/remove', (req, res) => {
    Site.destroy({
        where: {
            id: req.body.id
        }
    }).then((result) => {
        console.log(result);
    })
});

router.get('/showAll', (req, res) => {
    console.log("Came Here");
    Site.findAll({
        where: {id: req.user.id}
    }).then((sites) => {
        res.render('main', {
            user : req.user,
            site : sites
        });
    });
});

module.exports = router;

