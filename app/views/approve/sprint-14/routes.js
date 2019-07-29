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

// employer approvals
router.use('/research/employer/employer-approve', (req, res, next) => {
  require(`./research/employer/employer-approve/routes`)(req, res, next);
})

// employer approvals
router.use('/research/employer/employer-approve-2', (req, res, next) => {
  require(`./research/employer/employer-approve-2/routes`)(req, res, next);
})

// employer approvals
router.use('/research/employer/employer-led-add', (req, res, next) => {
  require(`./research/employer/employer-led-add/routes`)(req, res, next);
})

// provider adds
router.use('/research/provider/provider-adds', (req, res, next) => {
  require(`./research/provider/provider-adds/routes`)(req, res, next);
})

// provider approvals
router.use('/research/provider/provider-approve', (req, res, next) => {
  require(`./research/provider/provider-approve/routes`)(req, res, next);
})

module.exports = router