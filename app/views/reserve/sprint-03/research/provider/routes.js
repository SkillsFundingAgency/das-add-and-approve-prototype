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

// Choose date
router.get('/funding--enter-details', (req, res) => {
	var currentMonth = moment().format('MMMM YYYY')

	var months = [{
		value: currentMonth,
		text: moment(currentMonth).startOf('month').format("MMM YYYY") + " (secured from " + moment(currentMonth).startOf('month').format("MMM YY") + " to " + moment(currentMonth).add(2, 'months').endOf('month').format("MMM YY") + ")",
		attributes:
		{
			required: "required"
		}
	}]

	function addMonths(m){
		if(months.length < m){
			var date = moment(months[months.length-1]["value"]).add(1, 'months').format("MMM YYYY");
			var month = {
				value: date,
				text: moment(date).startOf('month').format("MMM YYYY") + " (secured from " + moment(date).startOf('month').format("MMM YY") + " to " + moment(date).add(2, 'months').endOf('month').format("MMM YY") + ")",
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

	res.render(`${req.feature}/funding--enter-details`,{months})
})

router.post('/funding--enter-details', (req, res) => {
	var earliest = moment(req.session.data['planned-start-date']).startOf('month').format("MMMM YYYY")
	var latest =  moment(req.session.data['planned-start-date']).add(2, 'months').endOf('month').format("MMMM YYYY")
	req.session.data['reservation-employer'] = req.session.data['employer']
	req.session.data['reservation-startRange'] = earliest
	req.session.data['reservation-endRange'] = latest
	req.session.data['reservation-created'] = moment().format('MMMM YYYY')

	if(req.session.data['course-name'] == ''){
		req.session.data['course-name'] = 'Unknown'
	}

	res.redirect('funding--confirm-details')
})

// Confirm employer (reserve)
router.post('/funding--confirm-employer', (req, res) => {
	req.session.data['course-name'] = ''
	
	if (req.session.data['confirm-employer'] == 'yes' ) {
		res.redirect(`funding--enter-details`)
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
	var reservation = {
		"id": cryptoRandomString(10),
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

// funding warning skip
router.get('/funding-warning', (req, res) => {
	res.redirect('choose-date')
})

// reservation complete
router.post('/funding--reservation-complete', (req, res) => {
	if (req.session.data['add-apprentice'] == 'yes' ) {
		res.redirect(`apprentice-details`)
	} else {
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
router.post('/apprentice-details', (req, res) => {
	req.session.data['reservations'] = req.session.data['reservations'].filter(function(item) {
		return item.id !== req.session.data['choose-reservation']
	});

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

	res.redirect(`funding--manage`)
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