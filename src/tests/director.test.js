const request = require('supertest');
const app = require('../app');

let id;

test("GET /directors, debe retornar todos los directores", async() => {
    const res = await request(app).get("/directors");
		expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un director', async () =>{
    const newDirector = {
        firstName: 'Test',
        lastName: 'Director',
        nationality:'Uruguayo',
        image: 'https://xsgames.co/randomusers/avatar.php?g=male',
        birthday: '1975-02-01'
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test('PUT /directors/:id debe actualizar un director', async() => {
    const updDirector = {
        firstName: 'Test2',
        lastName: 'Director2',
        nationality:'Aleman',
        image: 'https://xsgames.co/randomusers/avatar.php?g=male',
        birthday:'1988-02-01'
    }

    const res = await request(app).put(`/directors/${id}`).send(updDirector);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updDirector.firstName);

});

test('DELETE /directors:id debe eliminar un director', async() => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});