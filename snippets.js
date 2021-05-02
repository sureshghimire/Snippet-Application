
//---------------------------------------------------
// On this server:
//1. Create a GET route to fetch all of our snippets 
//2. Creat a POST route to add snippets
//3. Create a GET by ID route to get single snippet by ID
//-------------------------------------------------------

//------------  ROUTER LEVEL APPLICATION    -------------

//call express router
const router = require('express').Router();

// Add ROUTER LEVEL MIDDLEWARE-----
router.use((req,res,next)=>{
    console.log('Running Router Level Middleware');

    if(req.method==='POST' && req.body){
        const data = req.body;
        data.created = Date.now();      //it will add variable called 'created' on new obj that will be created

    }

    next();
})


const db = require('./db/snippet_collection.js');


//----  GET All the snippets
router.get('/snippets', (req, res) => {
    const all = db.all();
    res.json(all);
})

// ------   Add the snippet-----
router.post('/snippets', (req, res) => {
    const data = req.body;
    const snippet = db.add(data);
    res.status(201).json(snippet);
})

//  ------ GET a snippet by ID------
router.get('/snippets/:id', (req, res) => {
    const { id } = req.params;     //params is an obj, and the url could have many paramaters, Using params will get the last paramater of URL

    try{
        const snippet = db.get(id);
        res.json((snippet));
    }catch(error){
        res.status(404).json({error:error.toString()});
    }
})

module.exports=router;