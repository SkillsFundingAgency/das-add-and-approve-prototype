const express = require('express')
const router = new express.Router()

var _ = require('underscore');
var moment = require('moment');
const cryptoRandomString = require('crypto-random-string');

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

//end of journey screens
router.post('/confirmation', (req, res) => {
	if (req.session.data['next-step'] == 'upload') {
	  res.redirect('upload')
	} //else if (req.session.data['next-step'] == 'account-home') {
	  //res.redirect('account-home')
	//} else {
    //  res.redirect('#') 
   //}
	})
  
  module.exports = router