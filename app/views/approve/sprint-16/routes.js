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

// provider add multiple apprentices in one go
router.use('/research/provider/add-multiple-apprentices-in-one-go', (req, res, next) => {
  require(`./research/provider/add-multiple-apprentices-in-one-go/routes`)(req, res, next);
})

// provider manage your apprentices
router.use('/research/provider/manage-your-apprentices', (req, res, next) => {
  require(`./research/provider/manage-your-apprentices/routes`)(req, res, next);
})

// employer manage your apprentices
router.use('/research/employer/manage-your-apprentices', (req, res, next) => {
  require(`./research/employer/manage-your-apprentices/routes`)(req, res, next);
})

module.exports = router