const errorHandler = require('../src/middlewars/500.js');
let req = {};
let res = { status: function (s) { this.status = s; return this; }, json: () => { } };
let err = 'error';
let next = jest.fn(); 

describe('web server', () => {
  it('should respond with 500', () => {
    errorHandler(err, req, res, next);
    expect(res.status).toBe(500);
  });
});