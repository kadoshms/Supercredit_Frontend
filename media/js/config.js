define([
  'jquery',
  'underscore',
], function($, _){
	var exports = {}
	exports.url = "http://localhost:3000/api/";
	exports.STATUS_PURCHASE_DENIED 		= 1010;
	exports.STATUS_PURCHASE_APPROVED 	= 1020;
	exports.STATUS_NO_CREDENTIALS		= 1101;
	exports.STATUS_PURCHASE_PENDING		= 1030;
	exports.SLIDER_MAX					= 2000;
	exports.SLIDER_MIN					= 1;
	exports.READER_AVG					= 11;
	exports.TIME_DELAY					= 500;
	exports.PENDING_TIME				= 1; //seconds
	exports.AUTO_APPROVE_TIME			= 20;
	exports.AUTO_APPROVE_URL			= exports.url+"purchase/";
    exports.APP_ID 						= "CtKrDhLEMo8k05hV4HekNMkx4MXmpBercuzruQ2T";
    exports.JS_KEY 						= "DXiwCPUXTc5KexElBXhOVg6y9UWi0ym4bbbuD8LL";
    exports.REST_KEY	 				= "wOcrKgh0Q6icbGJ4gotHtmLpYdVPntPhhMKpGVsc";
    exports.PURCHASES_CLASS_REST		= "https://"+exports.APP_ID+":javascript-key="+exports.JS_KEY+"@api.parse.com/1/classes/Purchases/";
	return exports;
});
