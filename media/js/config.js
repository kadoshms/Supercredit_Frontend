define([
  'jquery',
  'underscore',
], function($, _){
	var exports = {}
	exports.url = "http://localhost:3000/api/";
	exports.STATUS_PURCHASE_DENIED 		= 1010;
	exports.STATUS_PURCHASE_APPROVED 	= 1020;
	exports.STATUS_NO_CREDENTIALS		= 1101;
	return exports;
});