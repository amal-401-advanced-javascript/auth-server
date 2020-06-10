'use strict';
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Model = require('../mongo.js');
const SECRET = process.env.SECRET || 'mysecret';
const schema= require('./users-schema.js');

class Users extends Model {
  constructor(){
    super(schema);
  }
  async save(record){
    const db = await this.get ({username : record.username});
    if (db.length == 0) {
      record.password = await bcryptjs.hash(record.password, 5);
      const user = await this.create(record);
      return user;
    }
    // return Promise.reject(); // ==>.catch
  }
  // user:pass
  //signin
  async authenticateBasic(user , pass){
    const db = await this.get({username : user});
    const valid = await bcryptjs.compare(pass,db[0].password);
    return valid ? db: Promise.reject('wrong password');
  }
  //signin/signup
  generateToken(user){
    // const token = jwt.sign({ username : user.username}, SECRET);
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (15 * 60),
      algorithm:  'RS384',
      username: user.username,
    },SECRET);
    return token;
  }
  async authenticateToken(token){
  // akjsndlaksnd.34naliendiasnd.3nksabndfw334ng
    try {
      const tokenObject = await jwt.verify(token, SECRET);
      const db = await this.get({ username : tokenObject.username});
      // tokenObject = {username:"mahmoud",iat:91223238}
      if (db.length != 0) {
        return Promise.resolve(db[0]);
      } else {
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }

}
module.exports = new Users();
