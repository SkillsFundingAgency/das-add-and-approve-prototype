const express = require('express')
const router = new express.Router()

// custom filters
var moment = require('moment');
var _ = require('underscore');
const cryptoRandomString = require('crypto-random-string');

// data
// var reservations = [];


// reservations data storage
router.use(function (req, res, next) {
	if (!req.session.data['reservations']) {
		req.session.data['reservations'] = []
	}

	if (req.session.data['preload-reservations'] == 'true') {
		req.session.data['reservations'] = require('../reservations.json')
	}
	
	req.session.data['preload-reservations'] = 'false'

	next()
})


// Login
router.post('/login', (req, res) => {
	var redirect = req.session.data['redirect']
	req.session.data['redirect'] = ''
	res.redirect(redirect)
})


// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/account-home`)
})

// Confirm employer (add)
router.post('/add__confirm-employer', (req, res) => {
	if (req.session.data['confirm-employer'] == 'yes' ) {
		res.redirect(`choose-reservation`)
	} else {
		req.session.data['employer'] = ''
		res.redirect(`add__choose-employer`)
	}
})


// funding start
router.get('/funding--start', (req, res) => {
	if ( req.session.data['funding-restrictions'].includes('current-restriction') ) {
		res.redirect(`funding--start--service-unavailable`)
	} else {
		res.render(`${req.feature}/funding--start`)
	}
})


// Choose date
router.get('/funding--enter-details', (req, res) => {
	var currentMonth = moment().format('MMM YYYY')
	var monthFormat = "MMM YYYY"

	var months = [{
		value: currentMonth,
		text: moment(currentMonth).startOf('month').format(monthFormat),
		attributes:
		{
			required: "required"
		}
	}]

	function addMonths(m){
		if(months.length < m){
			var date = moment(months[months.length-1]["value"]).add(1, 'months').format(monthFormat);
			var month = {
				value: date,
				text: moment(date).startOf('month').format(monthFormat),
				hint:
				{
					text: ""
				}
			}

			months.push(month)
			addMonths(m)
		}
	}

	addMonths(6)

	// check that the selected employer hasnt got too many reservations yet
	var a = req.session.data['reservations']
	var e = req.session.data['employer']
	var employerReservationCount = a.filter((obj) => obj.employer === e).length   // https://stackoverflow.com/questions/45547504/counting-occurrences-of-particular-property-value-in-array-of-objects-angular/45547593

	if ( req.session.data['funding-restrictions'].includes('number-of-starts') && employerReservationCount > 0 ) {
		res.redirect(`funding--employer-ineligible`)
	} else {
		res.render(`${req.feature}/funding--enter-details`,{months,employerReservationCount})
	}
})

router.post('/funding--enter-details', (req, res) => {
	var earliest = moment(req.session.data['planned-start-date']).startOf('month').format("MMM YYYY")
	var latest =  moment(req.session.data['planned-start-date']).add(2, 'months').endOf('month').format("MMM YYYY")
	req.session.data['reservation-employer'] = req.session.data['employer']
	req.session.data['reservation-startRange'] = earliest
	req.session.data['reservation-endRange'] = latest
	req.session.data['reservation-created'] = moment().format('MMM YYYY')

	if(req.session.data['course-name'] == ''){
		req.session.data['course-name'] = 'Unknown'
	}

	res.redirect('funding--confirm-details')
})


// Choose date
router.get('/funding--enter-details--errors', (req, res) => {
	var currentMonth = moment().format('MMM YYYY')
	var monthFormat = "MMM YYYY"

	var months = [{
		value: currentMonth,
		text: moment(currentMonth).startOf('month').format(monthFormat),
		attributes:
		{
			required: "required"
		}
	}]

	function addMonths(m){
		if(months.length < m){
			var date = moment(months[months.length-1]["value"]).add(1, 'months').format(monthFormat);
			var month = {
				value: date,
				text: moment(date).startOf('month').format(monthFormat),
				hint:
				{
					text: ""
				}
			}

			months.push(month)
			addMonths(m)
		}
	}

	addMonths(6)

	// check that the selected employer hasnt got too many reservations yet
	var a = req.session.data['reservations']
	var e = req.session.data['employer']
	var employerReservationCount = a.filter((obj) => obj.employer === e).length   // https://stackoverflow.com/questions/45547504/counting-occurrences-of-particular-property-value-in-array-of-objects-angular/45547593

	if ( req.session.data['funding-restrictions'].includes('number-of-starts') && employerReservationCount > 0 ) {
		res.redirect(`funding--employer-ineligible`)
	} else {
		res.render(`${req.feature}/funding--enter-details--errors`,{months,employerReservationCount})
	}
})


// Confirm employer (reserve)
router.post('/funding--confirm-employer', (req, res) => {
	req.session.data['course-name'] = ''
	
	// if you choose yes
	if (req.session.data['confirm-employer'] == 'yes' ) {
		// check that the selected employer hasnt got too many reservations yet
		var a = req.session.data['reservations']
		var e = req.session.data['employer']
		var employerReservationCount = a.filter((obj) => obj.employer === e).length   // https://stackoverflow.com/questions/45547504/counting-occurrences-of-particular-property-value-in-array-of-objects-angular/45547593

		// if there is a restriction on number of starts
		if ( req.session.data['funding-restrictions'].includes('number-of-starts')) {
			// and the employer has secured funds
			if ( employerReservationCount > 0 ) {
				res.render(`${req.feature}/funding--employer-ineligible`)
			} else {
				res.redirect(`funding--enter-details`)
			}		
		} else {
			res.redirect(`funding--enter-details`)
		}
	} else {
		req.session.data['employer'] = ''
		res.redirect(`funding--choose-employer`)
	}
})

// have account
router.post('/have-account', (req, res) => {
	if (req.session.data['have-account'] == 'yes' ) {
		res.redirect(`login`)
	} else {
		res.redirect(`know-provider`)
	}
})

// confirm details
router.get('/funding--confirm-details', (req, res) => {
	res.render(`${req.feature}/funding--confirm-details`)
})

router.post('/funding--confirm-details', (req, res) => {
	var reservationId = cryptoRandomString(10)
	req.session.data['choose-reservation'] = reservationId

	var reservation = {
		"id": reservationId,
		"month": req.session.data['planned-start-date'],
		"startMonth": req.session.data['reservation-startRange'],
		"endMonth": req.session.data['reservation-endRange'],
		"created": req.session.data['reservation-created'],
		"employer": req.session.data['reservation-employer'],
		"course": req.session.data['course-name']
	}

	req.session.data['reservations'].push(reservation)

	res.redirect(`funding--reservation-complete`)
})

// choose reservation
router.get('/choose-reservation', (req, res) => {
	var filteredReservations = _.filter(req.session.data['reservations'], function(reservation){
		return _.has(reservation, 'employer') && reservation['employer'] === req.session.data['employer'];
	})

	if(filteredReservations.length == 0){
		res.redirect('funding--enter-details')
	} else {
		res.render(`${req.feature}/choose-reservation`,{filteredReservations})
	}	
})

router.post('/choose-reservation', (req, res) => {
	if (req.session.data['choose-reservation'] == 'create-reservation' ) {
		res.redirect(`funding--enter-details`)
	} else {
		res.redirect(`apprentice-details`)
	}
})


// funding warning
router.get('/funding-warning-v1', (req, res) => {
	if ( req.session.data['funding-restrictions'] != '' ) {
		if ( req.session.data['funding-restrictions'].includes('current-restriction') ) {
			res.redirect(`funding--start--service-unavailable`)
		} else {
			res.render(`${req.feature}/funding-warning-v1`)
		}
	} else {
		res.redirect(`funding--start`)
	}
})


// reservation complete
router.post('/funding--reservation-complete', (req, res) => {
	let nextThing = req.session.data['whats-next']

	if (nextThing == 'add-apprentice' ) {
		res.redirect(`add--start`)
	} else if (nextThing == 'recruit-apprentice' ) {
		res.redirect(`recruit--start`)
	} else if (nextThing == 'find-provider' ) {
		res.redirect(`fat`)
	} else if (nextThing == 'return-to-homepage' ) {
		res.redirect(`account-home`)
	}
})

// reservation details
router.get('/funding--reservation-details', (req, res) => {
	var reservationDetails = _.filter(req.session.data['reservations'], function(item){
		return item['id'] === req.session.data['reservation-id'];
	})

	res.render(`${req.feature}/funding--reservation-details`,{reservationDetails})
})

// apprentice-details
router.get('/apprentice-details', (req, res) => {
	var reservationDetails = req.session.data['reservations'].filter(function(item) {
		return item.id == req.session.data['choose-reservation']
	});
	var month = moment().month(reservationDetails[0].startMonth).format("M")
	var year = moment().month(reservationDetails[0].startMonth).format("Y")

	reservationDetails[0].startMonthNumber = month
	reservationDetails[0].startYearNumber = year

	res.render(`${req.feature}/apprentice-details`,{reservationDetails})
})

router.post('/apprentice-details', (req, res) => {
	let reservation = req.session.data['reservations'].find(f => f.id == req.session.data['choose-reservation']);
	
	if(reservation){
		reservation.status = 'draft'
	}

	res.redirect(`review-apprentice-details`)
})

// delete reservation
router.get('/funding--delete', (req, res) => {
	var reservationDetails = _.filter(req.session.data['reservations'], function(item){
		return item['id'] === req.session.data['reservation-id'];
	})

	res.render(`${req.feature}/funding--delete`,{reservationDetails})
})

router.post('/funding--delete', (req, res) => {
	if (req.session.data['delete-reservation'] == 'yes' ) {
		req.session.data['reservations'] = req.session.data['reservations'].filter(function(item) {
			return item.id !== req.session.data['reservation-id']
		});
	}

	req.session.data['showDeleteConfirmation'] = 'true'

	res.redirect(`funding--manage`)
})


//funding manage
router.get('/funding--manage', (req, res) => {
	req.session.data['showDeleteConfirmation'] = 'false'

	res.render(`${req.feature}/funding--manage`)
})


// add another reservation
router.post('/funding--add-another-reservation', (req, res) => {
	if (req.session.data['add-reservation'] == 'yes' ) {
		res.redirect(`funding--enter-details`)
	} else {
		res.redirect(`funding--manage`)
	}
})

// details sent
router.post('/details-sent', (req, res) => {
	if (req.session.data['add-another'] == 'yes' ) {
		res.redirect(`choose-reservation`)
	} else {
		res.redirect(`account-home`)
	}
})

module.exports = router