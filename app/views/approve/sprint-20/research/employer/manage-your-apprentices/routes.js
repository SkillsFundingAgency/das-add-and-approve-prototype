const express = require('express')
const router = new express.Router()

var _ = require('underscore');
var moment = require('moment');
const cryptoRandomString = require('crypto-random-string');

router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/email`)
})

router.get('*/manage-your-apprentices', function (req, res) {
	res.render('approve/sprint-20/research/employer/manage-your-apprentices/manage-your-apprentices', {
   "query" : req.query,
   }
  )
 })

 router.get('*/manage-your-apprentices-filters', function (req, res) {
	res.render('approve/sprint-20/research/employer/manage-your-apprentices/manage-your-apprentices-filters', {
   "query" : req.query,
   }
  )
 })

 router.get('*/manage-your-apprentices-filters-100', function (req, res) {
	res.render('approve/sprint-20/research/employer/manage-your-apprentices/manage-your-apprentices-filters-100', {
   "query" : req.query,
   }
  )
 })

 router.get('*/manage-your-apprentices-filters-pg2', function (req, res) {
	res.render('approve/sprint-20/research/employer/manage-your-apprentices/manage-your-apprentices-filters-pg2', {
   "query" : req.query,
   }
  )
 })

 router.get('*/manage-your-apprentices-filtered-view', function (req, res) {
	res.render('approve/sprint-20/research/employer/manage-your-apprentices/manage-your-apprentices-filtered-view', {
   "query" : req.query,
   }
  )
 })

  module.exports = router