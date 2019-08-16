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
		res.redirect(`account-home`)
	}
})

//review-apprentices
router.post('/review-apprentices', (req, res) => {
	if (req.session.data['approve'] == 'yes' ) {
		res.redirect(`confirmation`)
	} else {
		res.redirect(`not-confirmed`)
	}
})

//review-apprentices-2
router.post('/review-apprentices-2', (req, res) => {
	if (req.session.data['approve'] == 'yes' ) {
		res.redirect(`confirmation`)
	} else {
		res.redirect(`not-confirmed`)
	}
})

//end of journey screens
router.post('/confirmation', (req, res) => {
if (req.session.data['next-step'] == 'homepage') {
	res.redirect('account-home')
} else {
	res.redirect('login1')
}
})

router.post('/not-confirmed', (req, res) => {
	if (req.session.data['next-step'] == 'homepage') {
		res.redirect('account-home')
	} else {
		res.redirect('login1')
	}
	})

module.exports = router