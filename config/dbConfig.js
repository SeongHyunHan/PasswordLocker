const Sequelize = require('sequelize');
const User = require('../model/user');

const { db } = require('../config/keys');

const sequelize = new Sequelize(db.database, db.username, db.password, {
    logging: false,
    host: db.host,
    port: db.port,
    dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log(`Database Connected at port: 5432`);
});

module.exports = sequelize;