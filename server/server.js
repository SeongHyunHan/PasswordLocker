// Import 3rd-party packages
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

// Import Local Packages 
var {mongoose} = require('./../mongodb/db');
var {User} = require('./../model/user');
var {Site} = require('./../model/site');
var {authenticate} = require('./../middleware/middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['userId', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).status(200).send({user});
    }).catch((e) => res.status(400).send(e));
});

app.post('/sites', (req, res) => {
    var token = req.header('x-auth');
    var decoded;
    try{
        decoded = jwt.verify(token, 'PasswordLocker');
    }catch (e) {
        return Promise.reject();
    }
    var body = _.pick(req.body, ['siteURL', 'siteID', 'password']);
    var site = new Site({
        siteURL : body.siteURL,
        siteID : body.siteID,
        password : body.password,
        userID : decoded._id
    });

    site.save().then((doc) => {
        res.send({doc});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/sites/getAll', authenticate, (req, res) => {
    Site.find({userID: req.user._id}).then((sites) => {
        for(i = 0; i < sites.length; i++){
            console.log(sites[i]);
            var decoded;
            try{
                decoded = jwt.verify(sites[i].password, 'PasswordLocker');
                sites[i].password = decoded;
            }catch(e){
                return Promise.reject();
            }
        }
        res.send({sites});
    }).catch ((e) => res.status(400).send(e));
});

app.get('/sites/getOne', authenticate, (req, res) => {
});

app.listen(port, () => {
    console.log(`Server start port : ${port}`);
});