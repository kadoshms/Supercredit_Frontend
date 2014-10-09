// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'libs/mustache',
  'pParse',
  'views/main',
], function($, _, Backbone,Mustache,pParse,MainView){
  var initialize = function(){
	var mainView = new MainView.MainView()
	mainView.render()
  }

  return {
    initialize: initialize
  };
});
