const express = require('express')
const router = new express.Router()

var _ = require('underscore');
var moment = require('moment');
const cryptoRandomString = require('crypto-random-string');

router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/email`)
})

// Confirm employer (add)
router.post('/add--one-or-more-employers', (req, res) => {
	if (req.session.data['add'] == 'yes' ) {
		res.redirect(`add__choose-employer`)
	} else {
		req.session.data['add'] = 'no'
		res.redirect(`upload`)
	}
})

// Confirm employer (add)
router.post('/add__confirm-employer', (req, res) => {
	if (req.session.data['confirm-employer'] == 'yes' ) {
		res.redirect(`start-adding`)
	} else {
		req.session.data['employer'] = ''
		res.redirect(`add__choose-employer`)
	}
})
  
// End of journey screens
router.post('/confirmation', (req, res) => {
	if (req.session.data['next-step'] == 'upload') {
	  res.redirect('add__choose-employer')
	} else if (req.session.data['next-step'] == 'account-home') {
	  res.redirect('account-home')
	} else {
    res.redirect('login') 
  }
	})
  
  module.exports = router