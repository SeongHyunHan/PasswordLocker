const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var SiteSchema = new mongoose.Schema({
    siteURL: {
        type : String,
        required : true,
        trim: true
    },
    siteID : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    userID : {
        type : String,
        required: true
    }
});

SiteSchema.methods.toJSON = function() {
    var site = this;
    var siteObject = site.toObject();

    return _.pick(siteObject, ['siteURL', 'siteID', 'userID', 'password']);
};

SiteSchema.pre('save',function (next) {
    var site = this;
    if(site.isModified('password')){
        site.password = jwt.sign(site.password, 'PasswordLocker').toString();
        next();
    }else{
        next();
    }
});

var Site = mongoose.model('Site', SiteSchema);

module.exports = {Site};