const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model')

router.get('/', async (req, res, next) => {
    try {
      const moviesDB = await Movie.find({}).populate('cast');
      console.log(moviesDB)
      res.status(200).render('./movies/movies', {moviesDB});
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

router.get('/create', async (req, res, next) => {
    try {
      const celebDB = await Celebrity.find({});
      res.status(200).render('./movies/new-movie', {celebDB});
    } catch (error) {
      console.error(error);
      next(error);
    }
});

router.post('/create', async (req, res, next) => {
  try {
    const {title, genre, plot, cast} = req.body
    await Movie.create({title, genre, plot, cast});
    res.status(200).redirect('/movies');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:id/delete', async (req, res, next) => {
    try {
      const {id} = req.params;
      await Movie.findByIdAndDelete({_id: id});
      res.status(200).redirect('/movies');
    } catch (error) {
      console.error(error);
      next(error);
    }
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    const {id} = req.params;
    const celebDB = await Celebrity.find({});
    const movieDB = await Movie.findById({_id: id}).populate('cast');
    res.status(200).render('./movies/edit-movie', {movieDB, celebDB});
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/:id/edit', async (req, res, next) => {
  try {
    const {title, genre, plot, cast} = req.body
    const {id} = req.params;
    await Movie.findByIdAndUpdate({_id: id}, {title, genre, plot, cast});
    res.status(200).redirect('/movies');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
    try {
      const {id} = req.params
      const movieDB = await Movie.findById({_id: id}).populate('cast');
      res.status(200).render('./movies/movie-details', movieDB);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;