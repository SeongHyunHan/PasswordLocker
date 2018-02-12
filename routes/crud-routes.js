const router = require('express').Router();

const url = require('url');

const User = require('../model/user');
const Site = require('../model/site');

router.post('/', (req, res, next) => {
    const method = req.body.method;
    switch(method){
        case 'post':
            const userId = req.user.dataValues.id;
            const siteURL = req.body.siteURL;
            const siteId = req.body.siteId;
            const password = req.body.password;
            Site.findOne({
                where: {
                    userId,
                    siteURL,
                    siteId
                }
            }).then((site) => {
                if(!site){
                    Site.create({
                        siteURL: req.body.siteURL,
                        siteId: req.body.siteId,
                        password: req.body.password,
                        userId: req.user.dataValues.id
                    }).then((site) => {
                        res.redirect(url.format({
                            pathname: '/home',
                            query: {
                                result: 1
                            }
                        }));
                    });        
                }else{
                    res.redirect(url.format({
                        pathname: '/home',
                        query: {
                            result: 2
                        }
                    }));
                }
            })
            
            break;
        case 'patch':
            Site.update({
                siteURL: req.body.siteURL,
                siteId: req.body.siteId,
                password: req.body.password
            },{
                where: {
                    id: req.body.id
                }
            }).then((result) => {
                res.redirect(url.format({
                    pathname: '/home',
                    query: {
                        result: 3
                    }
                }));
            });
            break;
        case 'delete':
            Site.destroy({
                where: {
                    id: req.body.id
                }
            }).then((result) => {
                console.log(result);
            });
            break;
    }
});

router.get('/showAll', (req, res) => {
    Site.findAll({
        where: {userId: req.user.id}
    }).then((sites) => {
        res.render('main', {
            user : req.user,
            site : sites
        });
    });
});

module.exports = router;

