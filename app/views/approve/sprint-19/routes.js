const express = require('express')
const router = new express.Router()

router.use('/', (req, res, next) => {
  req.feature = req.originalUrl.split('/')[1] + '/' + req.originalUrl.split('/')[2] + '/' + req.originalUrl.split('/')[3] + '/' + req.originalUrl.split('/')[4]
  res.locals.feature = req.feature
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.redirect('../')
})

// provider manage your apprentices
router.use('/research/provider/manage-your-apprentices', (req, res, next) => {
  require(`./research/provider/manage-your-apprentices/routes`)(req, res, next);
})

// employer manage your apprentices
router.use('/research/employer/manage-your-apprentices', (req, res, next) => {
  require(`./research/employer/manage-your-apprentices/routes`)(req, res, next);
})

// employer recruit data
router.use('/research/employer/recruit-data', (req, res, next) => {
  require(`./research/employer/recruit-data/routes`)(req, res, next);
})

// provider recruit data
router.use('/research/provider/recruit-data', (req, res, next) => {
  require(`./research/provider/recruit-data/routes`)(req, res, next);
})

module.exports = router