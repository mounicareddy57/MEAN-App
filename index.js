const express = require('express'); 
const app  = express(); //Initiate Express Application
const router = express.Router(); //Create a new router object
const mongoose = require('mongoose'); //Node tool for MongoDB
const config = require('./config/database.js'); //Mongoose config
const path = require('path'); //Node package for file paths
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

//database connection using mongoose
mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log('Connection to db failed:', err);
    }else{
        console.log('Connected to db: ' +config.db);
    }
});

//middleware
app.use(cors({
    origin: 'http://localhost:4200'
}));
//parse application
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);

//connect server to client index.html
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname +'/client/dist/index.html'));
})

//start server
app.listen(8080, ()=>{
    console.log('Listening on port 8080');
});