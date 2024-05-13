const express = require('express');
const directorRouter = require('./director.router');
const actorRouter = require('./actor.router');
const movieRouter = require('./movie.router');
const genreRouter = require('./genre.router');
const router = express.Router();

// colocar las rutas aquí
router.use(actorRouter);
router.use(directorRouter);
router.use(movieRouter);
router.use(genreRouter);

module.exports = router;