const express = require('express')
const router = new express.Router()

var _ = require('underscore');
var moment = require('moment');
const cryptoRandomString = require('crypto-random-string');

// provider
router.use('/add-multiple-apprentices-in-one-go', (req, res, next) => {
   require(`./add-multiple-apprentices-in-one-go/routes`)(req, res, next);
 })

router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/email`)
})

router.get('*/manage-your-apprentices', function (req, res) {
	res.render('approve/sprint-10/research/providers/manage-your-apprentices', {
   "query" : req.query,
   }
  )
 })

 router.get('*/manage-your-apprentices-filters', function (req, res) {
	res.render('approve/sprint-10/research/providers/manage-your-apprentices-filters', {
   "query" : req.query,
   }
  )
 })

  module.exports = router