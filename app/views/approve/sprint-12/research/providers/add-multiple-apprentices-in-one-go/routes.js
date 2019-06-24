const express = require('express')
const router = new express.Router()

var _ = require('underscore');
var moment = require('moment');
const cryptoRandomString = require('crypto-random-string');

router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/email`)
})

//review an apprentice
router.post('/start-adding', (req, res) => {
	if (req.session.data['approve'] == 'add-1') {
	  res.redirect('apprentice-details')
	} else if (req.session.data['approve'] == 'upload') {
		res.redirect('upload')
	  }
	  else if (req.session.data['approve'] == 'approve') {
		res.redirect('approval-confirmed')
	  } else {
	  res.redirect('#')
	}
})

router.post('/review-cohort', (req, res) => {
	if (req.session.data['approve'] == 'add-1') {
	  res.redirect('apprentice-details')
	} else if (req.session.data['approve'] == 'upload') {
		res.redirect('upload')
	  }
	  else if (req.session.data['approve'] == 'approve') {
		res.redirect('approval-confirmed')
	  } else {
	  res.redirect('#')
	}
})

// Confirm employer (add)
router.post('/add__confirm-employer', (req, res) => {
	if (req.session.data['confirm-employer'] == 'yes' ) {
		res.redirect(`start-adding-provider`)
	} else {
		req.session.data['employer'] = ''
		res.redirect(`add__choose-employer`)
	}
})
  
//end of journey screens
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