const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    userId : {
        type : String,
        unique : true,
        required : true,
        minlength : 5,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    tokens : [{
        access : {
            type: String,
            required : true
        },
        token : {
            type : String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'userId']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'PasswordLocker').toString();

    user.tokens.push({access, token});
    
    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken =function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'PasswordLocker');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id : decoded._id,
        'tokens.access' : 'auth',
        'tokens.token' : token
    });
};

UserSchema.statics.findByCredentials = function (userID, password) {
    var User = this;
    User.findOne({userID}).then((user) => {
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            var validate = bcrypt.compare(userID, user.userID, (err, res) => {
                if(res){
                    resolve(user);
                }else{
                    reject(err);
                }
            });
        });
    });
};

UserSchema.pre('save',function (next) {
    var user = this;
    if(user.isModified('password')){
      var hashPw = bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        });
      });
    }else{
      next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
