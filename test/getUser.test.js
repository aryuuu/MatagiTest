const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

it('test GET /api/v1/users', async done => {
    const response = await request.get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
    done();
});