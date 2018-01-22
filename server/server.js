// Import 3rd-party packages
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

// Import Local Packages 
var {mongoose} = require('./../mongodb/db');
var {User} = require('./../model/user');
var {Site} = require('./../model/site');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['userId', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).status(200).send(user);
    }).catch((e) => res.status(400).send(e));
});


app.listen(port, () => {
    console.log(`Server start port : ${port}`);
});