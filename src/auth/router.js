const express = require('express');
const router = express.Router();
const users = require('./models/users/users-model.js');
const basicAuth = require('./middleware/basic.js');
const oauthAuth = require('./middleware/oauth.js');
router.post('/signup', save);
router.post('/signin', basicAuth , signin);
router.get('/users' , list);
router.get('/oauth', oauthAuth , oauth);


async function save (req,res){
  try{
    const user = await users.save(req.body);
    const token = users.generateToken(user);
    res.json({ token });
  }catch(err){
    res.status(403).send('user already exists');
  }
}

function signin (req, res) {
  res.json({ token: req.token , user: req.user });
}

async function list(req,res){
  const allUsers = await users.get({});
  res.json( {users : allUsers} );
}

function oauth(req,res){
  res.json({ token : req.token });
}
module.exports = router;
