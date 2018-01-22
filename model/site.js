const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var SiteSchema = new mongoose.Schema({
    siteURL: {
        type : String,
        required : true,
        trim: true,
    },
    userID : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tokens : [{
        access : {
            type : String,
            required: true
        },
        token : {
            type: String,
            required: true
        }
    }]
});

var Site = mongoose.model('Site', SiteSchema);

module.exports = {Site};