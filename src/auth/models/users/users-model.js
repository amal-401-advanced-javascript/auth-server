'use strict';
require('dotenv').config();
const schema= require('./users-schema.js');
const Model = require('../mongo.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const SECRET = process.env.SECRET || 'mysecret';


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
    // return Promise.reject(); // ==>.catch/
  }
  // user:pass
  //signin
  async authenticateBasic(user , pass){
    const db = await this.get({username : user});
    const valid = await bcryptjs.compare(pass,db[0].password);
    return valid ? db : Promise.reject('wrong password');
  }
  //signin/signup
  generateToken(user){
    const token = jwt.sign({ username : user.username}, SECRET);
    return token;
  }
}

module.exports = new Users();
