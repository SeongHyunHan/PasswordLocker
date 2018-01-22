const {MongoClient, ObjectID} = require('mongodb');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/PasswordLocker');

module.exports = {
    mongoose
};