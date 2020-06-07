const base64 = require('base-64');
const users = require('../models/users/users-model.js');


module.exports = (req,res,next) =>{
  if(!req.headers.authorization){
    next('Invalid Login');
  }else{
    const basic = req.headers.authorization.split(' ').pop(); // ["Basic","m4e321$342"]
    console.log('basic', basic);
    const [user, pass] = base64.decode(basic).split(':'); // "mahmoud:1234"
    console.log('__BasicAuth__', user, pass);
    users
      .authenticateBasic(user, pass)
      .then((validUser) => {
        req.token = users.generateToken(validUser[0]);
        req.user = validUser[0];
        next();
      })
      .catch((err) => next(err));
  }
};