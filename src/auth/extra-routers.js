'use strict';
const express = require('express');
const bearerAuth = require('./middleware/bearer-auth.js');
const permissions = require('./middleware/authorize.js');
const router = express.Router();

router.get('/secret', bearerAuth , bearerMiddleware );
function bearerMiddleware(req,res){
  res.json(res.user);
}
router.get('/read', bearerAuth, permissions('read'),(req, res) =>{
  res.send('OK!');
});
router.post('/add', bearerAuth, permissions('create'),(req, res) =>{
  res.send('OK!');
});
router.put('/change', bearerAuth, permissions('update'),(req, res) =>{
  res.send('OK!');
});
router.delete('/remove', bearerAuth, permissions('delete'),(req, res) =>{
  res.send('OK!');
});



module.exports = router;