const Sequelize = require('Sequelize');
const db = require('../config/dbConfig');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING
    },
    authId: {
        type: Sequelize.STRING
    }
},{
    timestamps: false
});

// Create Table
User.sync();

module.exports = User;

