const request = require('supertest');
const app = require('../app');

let id;

test("GET /actors, debe retornar todos los actores", async() => {
    const res = await request(app).get("/actors");
		expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () =>{
    const newActor = {
        firstName: 'Test',
        lastName: 'Actor',
        nationality:'Español',
        image: 'https://xsgames.co/randomusers/avatar.php?g=male',
        birthday: '1995-02-01'
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName);
});

test('PUT /actors/:id debe actualizar un actor', async() => {
    const updActor = {
        firstName: 'Test2',
        lastName: 'Actor2',
        nationality:'Italiano',
        image: 'https://xsgames.co/randomusers/avatar.php?g=male',
        birthday:'1990-02-01'
    }

    const res = await request(app).put(`/actors/${id}`).send(updActor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updActor.firstName);

});

test('DELETE /actors:id debe eliminar un actor', async() => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});