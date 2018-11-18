let mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/applicants', {
    useNewUrlParser: true
});
let db = mongoose.connection;

db.on('error', function () {
    console.log('mongoose connection error');
});

db.once('open', function () {
    console.log('mongoose connected successfully')
});




let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    nationality: String,
    city: String,
    experiance: String,
    yearsOfExperiance: String,
    isWorking: String,
    github: String,
    javaScript: String,
    oop: String,
    about: String,
    resume: String
});

let messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('User', userSchema);
let Messages = mongoose.model('Messages', messageSchema);


module.exports.User = User;
module.exports.Messages = Messages;