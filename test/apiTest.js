const request = require('supertest');
const app = require('../index');

//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe('GET /api/v1/user', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



