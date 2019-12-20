const express = require('express')
const router = new express.Router()

var _ = require('underscore');
var moment = require('moment');
const cryptoRandomString = require('crypto-random-string');

router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/email`)
})

// Confirm employer (add)
router.post('/add__confirm-employer', (req, res) => {
	if (req.session.data['confirm-employer'] == 'yes' ) {
		res.redirect(`training-dates`)
	} else {
		req.session.data['employer'] = ''
		res.redirect(`add__choose-employer`)
	}
})

//training-dates
router.post('/training-dates', (req, res) => {
	var month = req.session.data['stop-date-month']
	var year =  req.session.data['stop-date-year']
	req.session.data['formattedDate'] = moment().date(1).month(month - 1).year(year).format('MMMM YYYY')

	var startMonth = req.session.data['start-date-month']
	var startYear =  req.session.data['start-date-year']
	req.session.data['formattedDate'] = moment().date(1).month(startMonth - 1).year(startYear).format('MMMM YYYY')

	res.redirect(`price`)
})

//approve apprentices
router.post('/approve-apprentices', (req, res) => {
	if (req.session.data['approve'] == 'yes') {
	  res.redirect('confirmation')
	} else if (req.session.data['approve'] == 'no') {
	  res.redirect('not-confirmed')
	} else {
	res.redirect('approve-apprentices-error')
  }
})

//approve apprentices edited
router.post('/approve-apprentices-edited', (req, res) => {
	if (req.session.data['approve'] == 'yes') {
	  res.redirect('confirmation')
	} else if (req.session.data['approve'] == 'no') {
	  res.redirect('not-confirmed')
	} else {
	res.redirect('approve-apprentices-error')
  }
})

//approve apprentices error
router.post('/approve-apprentices-error', (req, res) => {
	if (req.session.data['approve'] == 'yes') {
	  res.redirect('confirmation')
	} else if (req.session.data['approve'] == 'no') {
	  res.redirect('not-confirmed')
	} else {
	res.redirect('approve-apprentices-error')
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

//review an apprentice
router.post('/confirm-deletion', (req, res) => {
	if (req.session.data['delete'] == 'yes') {
	  res.redirect('approve-apprentices-group-deletion')
	} else {
	  res.redirect('approve-apprentices')
	}
	})

//review an apprentice
router.post('/confirm-deletion-1', (req, res) => {
	if (req.session.data['delete'] == 'yes') {
	  res.redirect('approve-apprentices-group-deletion')
	} else {
	  res.redirect('approve-apprentices')
	}
	})

//delete apprentice
router.post('/delete-apprentice', (req, res) => {
	if (req.session.data['delete'] == 'yes') {
	  res.redirect('approve-apprentices-deletion')
	} else if (req.session.data['delete'] == 'no') {
	  res.redirect('approve-apprentices')
	}
	else {
	  res.redirect('delete-apprentice-error')
	}
	})

//delete the only apprentice
router.post('/delete-apprentice-1', (req, res) => {
	if (req.session.data['delete'] == 'yes') {
	  res.redirect('draft-apprentices-deletion-3')
	} else if (req.session.data['delete'] == 'no') {
	  res.redirect('approve-apprentices-delete-apprentice')
	}
	else {
	  res.redirect('delete-apprentice-error')
	}
	})

//delete the only apprentice version 2
router.post('/delete-apprentice-2', (req, res) => {
	if (req.session.data['delete'] == 'yes') {
	  res.redirect('approve-apprentices-group-deletion')
	} else if (req.session.data['delete'] == 'no') {
	  res.redirect('approve-apprentices-delete-apprentice')
	}
	else {
	  res.redirect('delete-apprentice-error')
	}
	})

module.exports = router
