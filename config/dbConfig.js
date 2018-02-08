const Sequelize = require('sequelize');
const User = require('../model/user');

const database = 'seong';
const username = 'postgres';
const password = 'syjs7193';
const port = '5432';
const host = 'localhost';

const sequelize = new Sequelize(database, username, password, {
    logging: false,
    host,
    port,
    dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log(`Database Connected at port: 5432`);
});

module.exports = sequelize;