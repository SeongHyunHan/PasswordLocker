const Sequelize = require('Sequelize');
const db = require('../config/dbConfig');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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

