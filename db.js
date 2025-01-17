const mongoose = require('mongoose');
// define the mongodb connection uml
const mongoURL = 'mongodb://localhost:27017/hotel'//replace my databasewith any data base

//setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})

const db = mongoose.connection;

//define event listner for data base connection
db.on('connected',()=>{
console.log('connected to MongoDB server');
});

db.on('error',()=>{
    console.log('MongoDB connection error');
    });

    db.on('disconnected',()=>{
        console.log('disconnected to MongoDB server');
        });



        module.exports = db;