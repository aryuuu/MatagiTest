const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

it('test POST /api/v1/users', async done => {
    const response = await request.post('/api/v1/users');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("no name specified");
    done();
});