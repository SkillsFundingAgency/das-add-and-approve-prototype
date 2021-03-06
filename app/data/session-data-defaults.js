/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

var records = require('./records.json');
var records2 = require('./records2.json');
var recordsfilter = require('./recordsfilter.json');

var providerrecords = require('./providerrecords.json');
var providerrecords2 = require('./providerrecords2.json');
var providerrecords3 = require('./providerrecords3.json');
var providerrecords4 = require('./providerrecords4.json');
var providerrecordsfilters = require('./providerrecordsfilters.json');

var moment = require('moment');

module.exports = {
	"current-date": {
		DDDD: moment().format('DDDD'),
		D: moment().format('D'),
		DD: moment().format('DD'),
		MM: moment().format('MM'),
		MMM: moment().format('MMM'),
		MMMM: moment().format('MMM'),
		YYYY: moment().format('YYYY')
	},
	"random-future-date": moment().add(2,'months').startOf('month').format('D MMMM YYYY'),
	"employer": "BIG COMPANY LTD",
	"provider-name": "APEX TRAINING LIMITED",
	"multiple-legal-entities": "false",
	"funding-restrictions": [],
	"reservation-startRange": moment().startOf('month').format('DD MMMM YYYY'),
	"reservation-endRange": moment().add(2,'months').endOf('month').format('DD MMMM YYYY'),
	"course-name": "Unknown",
	"records": records,
	"providerrecords": providerrecords,
	"records2": records2,
	"providerrecords2": providerrecords2,
	"recordsfilter": recordsfilter,
	"providerrecordsfilters": providerrecordsfilters,
	"providerrecords3": providerrecords3,
	"providerrecords4": providerrecords4,
	"name": "Darren Diamond",
	"agreed-price": "£1,500"
}
