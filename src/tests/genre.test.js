const request = require('supertest');
const app = require('../app');

let id;

test("GET /genres, debe retornar todos los genres", async() => {
    const res = await request(app).get("/genres");
		expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe crear un genre', async () =>{
    const newGenre= {
        name: 'Test genre',

    }
    const res = await request(app).post('/genres').send(newGenre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newGenre.name);
});

test('PUT /genres/:id debe actualizar un genre', async() => {
    const updGenre= {
        name: 'Test2 genre',
    }

    const res = await request(app).put(`/genres/${id}`).send(updGenre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updGenre.name);

});

test('DELETE /genres:id debe eliminar un genre', async() => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});