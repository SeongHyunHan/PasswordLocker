const Sequelize = require('Sequelize');
const db = require('../config/dbConfig');
const User = require('./user');

const Site = db.define('site', {
    siteURL:{
        type: Sequelize.STRING
    },
    siteId: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
},{
    timestamps: false
});

Site.belongsTo(User);

Site.sync();

module.exports = Site;