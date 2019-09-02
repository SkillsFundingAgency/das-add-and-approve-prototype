const express = require('express')
const router = new express.Router()

var _ = require('underscore');
var moment = require('moment');
const cryptoRandomString = require('crypto-random-string');

router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/email`)
})

//approve apprentices
router.post('/approve-apprentices', (req, res) => {
	if (req.session.data['approve'] == 'yes') {
	  res.redirect('confirmation')
	} else {
	  res.redirect('not-confirmed')
	}
})

//approve apprentices
router.post('/approve-apprentices-edited', (req, res) => {
	if (req.session.data['approve'] == 'yes') {
	  res.redirect('confirmation')
	} else {
	  res.redirect('not-confirmed')
	}
})

//end of journey screens
router.post('/confirmation', (req, res) => {
	if (req.session.data['next-step'] == 'homepage') {
		res.redirect('https://das-registration-prototype.herokuapp.com/1-0/registration/interim-homepage')
	} else {
	  res.redirect('login')
	}
	})

	router.post('/not-confirmed', (req, res) => {
		if (req.session.data['next-step'] == 'homepage') {
			res.redirect('https://das-registration-prototype.herokuapp.com/1-0/registration/interim-homepage')
		} else {
			res.redirect('login')
		}
		})

  module.exports = router
