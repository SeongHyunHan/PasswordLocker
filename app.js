const express = require('express');
const hbs = require('hbs');

const db = require('./mongodb/db');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/views'))

app.get('/', async (req, res, next) => {
    //call db to get all password
    console.log(await db.getAllPassword());
    //render it to home
    res.render('home.hbs');
});

app.get('/redirect', (req, res) => {
    var redirect = req.query.id;
    if(redirect === "signIn"){
        res.render('sign-In.hbs');
    }else if(redirect === "signUp"){
        res.render('sign-up.hbs');
    }
});


app.listen(port, () => {
    console.log(`Server is up on port : ${port}`);
})
