const router = require('express').Router();

const bcrypt = require('bcrypt');
const collections = require('./db/users_collection.js');

router.post('/register', async(req,res)=>{
    try{
        const {username, password } = req.body;

        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password,salt);

        const data = {username, password:hashed};
        //only for demo purposes
        console.log(data);

        collections.add(data);
        res.status(201).json({sucess: true});
    }catch(error){
        res.status(500).json({error: error.toString()});
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {username, password} = req.body;

        const user = collections.get(username);
        const authenticated = await bcrypt.compare(password, user.password);

        res.json({username, authenticated});
    }catch(error){
        res.status(500).json({error: error.toString()})
    }
})

module.exports= router;