const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/', async (req, res, next) => {
  try {
    const celebDB = await Celebrity.find({});
    res.status(200).render('./celebrities/celebrities', {celebDB});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/create', async (req, res, next) => {
    try {
      res.status(200).render('./celebrities/new-celebrity');
    } catch (error) {
      console.error(error);
      next(error);
    }
});

router.post('/create', async (req, res, next) => {
  try {
    const {name, occupation, catchPhrase} = req.body
    await Celebrity.create({name, occupation, catchPhrase});
    res.status(200).redirect('/celebrities');
  } catch (error) {
    res.redirect('/celebrities/create')
    console.error(error);
  }
});

module.exports = router;