const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let id;

test("GET /movies, debe retornar todas las movies", async() => {
    const res = await request(app).get("/movies");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una movie', async () =>{
    const newMovie = {
        name: 'Test movie post',
        image: 'https://mx.web.img2.acsta.net/pictures/20/09/30/19/57/1864294.jpg',
        synopsis: 'venganza',
        releaseYear: 2010

    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
});

test('PUT /movies/:id debe actualizar una movie', async() => {
    const updMovie= {
        name: 'Test2 movie put',
        image: 'https://mx.web.img2.acsta.net/pictures/20/09/30/19/57/1864294.jpg',
        synopsis: 'Ajuste de cuentas',
        releaseYear: 2015
    }

    const res = await request(app).put(`/movies/${id}`).send(updMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updMovie.name);

});

test('POST /movies/:id/genres insertar Genres a las Movies ', async () => { 
    
    const genre = await Genre.create({
        name: 'Accion'
    })

    const res = await request(app)
                .post(`/movies/${id}/genres`)
                .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1); //cantidad de genero que envia(objetos)

});

test('POST /movies/:id/actors insertar Actors a las Movies ', async () => { 
    
    const actor= await Actor.create({
        firstName: 'Test ',
        lastName: 'name actor',
        nationality: 'test',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfU5GvUs-50WDa_pjlfIgl6JYG3SO80upllDixN111dw&s',
        birthday: '1982-02-01'
    })

    const res = await request(app)
                .post(`/movies/${id}/actors`)
                .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1); //cantidad de genero que envia(objetos)

});

test('POST /movies/:id/diretors insertar Diretors a las Movies ', async () => { 
    
    const director= await Director.create({
        firstName: 'Test ',
        lastName: 'name director',
        nationality: 'test',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfU5GvUs-50WDa_pjlfIgl6JYG3SO80upllDixN111dw&s',
        birthday: '1978-02-01'
    })

    const res = await request(app)
                .post(`/movies/${id}/directors`)
                .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1); //cantidad de genero que envia(objetos)

});

test('DELETE /movies:id debe eliminar una movie', async() => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});

