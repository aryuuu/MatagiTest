const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

it('test GET /api/v1/users/1350241708900003', async done => {
    const response = await request.get('/api/v1/users/1350241708900003');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
    done();
});

it('test GET /api/v1/users/1350241708900xx', async done => {
    const response = await request.get('/api/v1/users/1350241708900xx');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("no user found");
    done();
});