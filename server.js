const express = require('express');
const bodyParser = require('body-parser');

const cors=require('cors');
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
 
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const toktable = require('./app/models/me.model.js');


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});



app.use(function(req, res, next) {
    
    next();
    
    // var token = req.headers['auth_key'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  	
  	// toktable.find({auth_key:token})
    // .then(me => {
    // 	if(me=="") 
    // 		return res.status(401).send({ auth: false, message: 'Token invalid.' });
    // 	else
    // 		next();
       
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while retrieving notes."
    //     });
    // });
    
});

// Require Notes routes
require('./app/routes/routes.js')(app);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});