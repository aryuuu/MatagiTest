const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

it('test PATCH /api/v1/users/1350241708900003', async done => {
    const response = await request.patch('/api/v1/users/1350241708900003');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user updated successfully");
    done();
});

it('test PATCH /api/v1/users/135024170890', async done => {
    const response = await request.patch('/api/v1/users/135024170890');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("user doesn't exist");
    done();
});