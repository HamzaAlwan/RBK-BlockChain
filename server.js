let express = require('express');
let upload = require('express-fileupload');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let filePluginLib = require('mongoose-file');
let filePlugin = filePluginLib.filePlugin;
let make_upload_to_model = filePluginLib.make_upload_to_model;



mongoose.connect('mongodb://localhost/applicants', { useNewUrlParser: true });
let db = mongoose.connection;
let app = express();

// DataBase
db.on('error', function() {
    console.log('mongoose connection error');
});

db.once('open', function() {
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
    date: { type: Date, default: Date.now }
  });

let User = mongoose.model('User', userSchema);
let Messages = mongoose.model('Messages', messageSchema);





app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(upload());











app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/resumes', function(req, res){
    res.sendFile(__dirname + '/resumes.html');
});

app.get('/messages', function(req, res){
    res.sendFile(__dirname + '/messages.html');
});



app.listen(app.get('port'), function() {
    console.log("NodeJs Connected on " + 3000)
});




app.post('/', (req, res) => {
    req.body.resume = JSON.stringify(req.files.resume);
    req.body.name = req.body.name.toLowerCase();
    let myData = new User(req.body);
    myData.save()
        .then(item => {        
                res.send("Thanks for Applying")        
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.post('/message', (req, res) => {
    let message = new Messages(req.body);
    message.save()
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
        let i, applicants = []
        for(i = 0; i < users.length; i++){
            users[i].resume = JSON.parse(users[i].resume).name
            applicants.push(users[i])
        }
        res.send(applicants)
    })
  .catch(err => console.log(err));
}
);

app.get('/msg', (req, res) => {
    Messages.find()
  .then(msg => {
        res.send(msg)
    })
  .catch(err => console.log(err));
}
);

 app.post('/resume', function(req,res) {
     
 let promise = new Promise(function(resolve, reject) {
  resolve('Success!');
});
    let id = req.body.id
  User.findOne({ _id: id })
  .then(resume => {   
        res.send(resume)
    })
  .catch(err => console.log(err));
}
)
