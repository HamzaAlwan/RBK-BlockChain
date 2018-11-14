const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;
const basicAuth = require('express-basic-auth');

mongoose.connect('mongodb://localhost/applicants', { useNewUrlParser: true });
const db = mongoose.connection;


const app = express();

// DataBase
db.on('error', function() {
    console.log('mongoose connection error');
});

db.once('open', function() {
    console.log('mongoose connected successfully')
});

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);







app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(upload())
app.use(basicAuth({
    users: { 'hanan': 'rbkhir' },
    challenge: true,
    realm: 'Imb4T3st4pp',
}))












app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/resumes', function(req, res){
    
    
    res.sendFile(__dirname + '/resumes.html');
});



app.listen(app.get('port'), function() {
    console.log("NodeJs Connected on " + 3000)
});




app.post('/', (req, res) => {
    req.body.resume = JSON.stringify(req.files.resume);
    req.body.name = req.body.name.toLowerCase();
    var myData = new User(req.body);
    myData.save()
        .then(item => {        
                res.send("Thanks for Applying")        
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get('/applicants', (req, res) => {
    User.find()
  .then(users => {
        var i, applicants = []
        for(i = 0; i < users.length; i++){
            users[i].resume = JSON.parse(users[i].resume).name
            applicants.push(users[i])
        }
        res.send(applicants)
    })
  .catch(err => console.log(err));
}
);

 app.post('/resume', function(req,res) {
     
 var promise = new Promise(function(resolve, reject) {
  resolve('Success!');
});
    var id = req.body.id
  User.findOne({ _id: id })
  .then(resume => {   
        res.send(resume)
    })
  .catch(err => console.log(err));
}
)
