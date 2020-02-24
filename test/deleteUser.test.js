const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

it('test DELETE /api/v1/users/1350241708900002', async done => {
    const response = await request.delete('/api/v1/users/1350241708900002');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user deleted successfully");
    done();
});

it('test DELETE /api/v1/users/1350241708900xx', async done => {
    const response = await request.delete('/api/v1/users/1350241708900xx');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid ID");
    done();
});