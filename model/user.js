const Sequelize = require('Sequelize');
const db = require('../config/dbConfig');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    auth: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authId: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    timestamps: false
});

// Create Table
User.sync();

module.exports = User;

