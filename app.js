const  http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');

const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);

//set up body-parser
app.set(bodyParser.json());

//set up view engine
app.set('view engine', 'ejs');

//initialize session
app.use(session({
    secret: keys.session.key,
    maxAge: 24* 60 * 60 * 1000,
    resave: false,
    saveUninitialized: true
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//middlewares
app.get('/auth', authRoutes);

//home route
app.get('/', (req, res) => {
    res.render('home');
});

server.listen(port, () => {
    console.log(`Server Started at port: ${port}`);
});