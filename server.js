//run thi server using: npm run start
//nodemon will be user on this server

const express = require('express');
const cors = require('cors');

//import snippets.js file 
const snippets = require('./snippets.js');

//call express function
const app = express();
const port = 8888;

//apply middleware to application level
app.use(cors());        //with this middleware we don't need to include CORS headers on each route call
app.use(express.json());      // json body praser new on express 6

//writing own middleware
app.use((req, res, next)=>{
    const { headers, method, url }= req;
    console.log('Running application level middleware');
    console.log(`Method: ${method} ${url} from user-agent ${headers['user-agent']}`);
    res.header(`Cache-control`, 'no-store');
    
    next();
})


//create a get route for '/' 
app.get('/',(req,res)=>{require
    res.send('Welcome to Snippets');
});




//add the snippet router to the express application
app.use('/',snippets)                   //always pass base rotute. Here we have '/' as base router

//start the server on localhoast and port 8888
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});

