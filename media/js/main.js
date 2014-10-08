// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
	'jquery':  'libs/jquery.min',
    'underscore': 'libs/underscore',
    'parse': 'libs/parse.min',
    'backbone':'backbone',
  },
  shim: {
	  	 'backbone':{
		  	deps:["underscore","jquery"],
	  		exports: "Backbone"
	  	 },
	     'parse': {
	        exports: 'Parse',
	        deps: ["jquery"]
	     },
	     'libs/backbone.parse':{
	    	 exports: 'BackboneParse',
	    	 deps:['backbone']
	     },
	     'libs/jquery.parse':{
	    	 exports: '$parse',
	    	 deps:['jquery']
	     }
	}

});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});