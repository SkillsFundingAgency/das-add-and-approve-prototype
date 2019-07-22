const express = require('express')
const router = new express.Router()

// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/review-an-apprentice`)
})

//review-an-apprentice
router.post('/review-an-apprentice', (req, res) => {
	if (req.session.data['approve'] == 'yes' ) {
		res.redirect(`confirmation`)
	} else {
		res.redirect(`not-confirmed`)
	}
})

//manage-apprentices
router.post('/review-apprentices', (req, res) => {
	if (req.session.data['approve'] == 'yes' ) {
		res.redirect(`confirmation`)
	} else {
		res.redirect(`not-confirmed`)
	}
})

module.exports = router