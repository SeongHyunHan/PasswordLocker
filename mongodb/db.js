const {MongoClient, ObjectID} = require('mongodb');

var getAllPassword = () =>{
    MongoClient.connect('mongodb://localhost:27017/PasswordLocker', (err, db) => {
        if(err){
            console.log('Unable to connect to MongoDB server');
        }else{
            console.log('Connected to MongoDB server');
            const myDb = db.db('PasswordLocker');

            myDb.collection('Passwords').find().toArray().then((docs) => {
                console.log('Able to get all data from Password documents')
                console.log(JSON.stringify(docs, undefined, 2));
                return docs
            }, (err) => {
                console.log('Unable to ftech Passwords', err);
            });

        }
    });
};









module.exports = {
    getAllPassword
}