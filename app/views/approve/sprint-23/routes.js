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
router.use('/research/provider/change-of-employer', (req, res, next) => {
  require(`./research/provider/change-of-employer/routes`)(req, res, next);
})

// employer manage your apprentices
router.use('/research/employer/manage-your-apprentices', (req, res, next) => {
  require(`./research/employer/manage-your-apprentices/routes`)(req, res, next);
})

// employer apprentice requests
router.use('/research/employer/employer-approve', (req, res, next) => {
  require(`./research/employer/employer-approve/routes`)(req, res, next);
})

// employer apprentice requests
router.use('/research/employer/change-provider', (req, res, next) => {
  require(`./research/employer/change-provider/routes`)(req, res, next);
})

module.exports = router