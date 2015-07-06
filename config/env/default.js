'use strict';


module.exports = {
	app: {
		title: 'MuktiBondhu',
		description: 'bangla, bangladesh, dhaka',
		keywords: 'bangla, bangladesh',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};
