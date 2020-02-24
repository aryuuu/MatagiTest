const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

it('test PUT /api/v1/users/1350241708900002', async done => {
    const response = await request.put('/api/v1/users/1350241708900002');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("no name specified");
    done();
});

it('test PUT /api/v1/users/1350241708900xx', async done => {
    const response = await request.put('/api/v1/users/1350241708900xx');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("no name specified");
    done();
});