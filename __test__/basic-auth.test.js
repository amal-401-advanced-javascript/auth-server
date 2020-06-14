'use strict';

const {server}=require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('server.js', () => {

  it('signup ', async() => {
    let theUser = { 'username': 'amal', 'password': '1234' };
    mockRequest
      .post('/signup').send(theUser).then(data => {
        expect(data.status).toEqual(403);
      });
  });

  it('signin ', async() => {
    let theUser = { 'username': 'amal', 'password': '1234' };
    mockRequest
      .post('/signin').send(theUser).then(data => {
        expect(data.status).toEqual(500);
      });
  });

  it('users ', () => {
    return mockRequest
      .get('/users').then(data => {
        expect(data.status).toEqual(200);
      });
  });

});


