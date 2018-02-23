const router = require('express').Router();

const url = require('url');

const User = require('../model/user');
const Site = require('../model/site');
const Crypto = require('./functions/crypto');

router.post('/', (req, res, next) => {
    const method = req.body.method;
    switch(method){
        case 'post':
            const userId = req.user.dataValues.id;
            const siteURL = req.body.siteURL;
            const siteId = req.body.siteId;
            const password = Crypto.encrypt(req.body.password);
            Site.findOne({
                where: {
                    userId,
                    siteURL,
                    siteId
                }
            }).then((site) => {
                if(!site){
                    Site.create({
                        siteURL,
                        siteId,
                        password,
                        userId
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
                password: Crypto.encrypt(req.body.password)
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
    }
});

router.get('/showAll', (req, res) => {
    Site.findAll({
        where: {userId: req.user.id}
    }).then((sites) => {
        res.render('home', {
            user : req.user,
            site : sites
        });
    });
});

module.exports = router;

