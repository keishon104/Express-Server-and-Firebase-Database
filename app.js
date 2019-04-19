const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const firebase = require("firebase-admin");

require('dotenv').config();

const port = process.env.PORT;

app.listen(port, function(){
  console.log('Welcome to my Database.');
})

//sets view engine
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var serviceAccount = require("./serviceAccountKey.json");

// Initalizes the database.
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://daroushproject.firebaseio.com"
});
var db = firebase.database();
var ref = db.ref("restricted_access/secret_document");


app.get('/', (req, res) => {

  console.log("it Works");

  res.send({ hello: 'world' });
});

app.post('/accounts', (req, res) => {
  ref.once("value", function(snapshot) {
    console.log(snapshot.val());
  });

  var usersRef = ref.child("users");
  usersRef.set({
    customer_1: {
      username: "testof122",
      password: "password122"
    },
    customer_2: {
      username: "testof2",
      password: "password2"
    }
  });  
});
