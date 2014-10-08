// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'libs/mustache',
  'libs/backbone.parse',
  'libs/jquery.parse',
  'views/main',
], function($, _, Backbone,Mustache,BackboneParse,$parse,MainView){
  var initialize = function(){
	var mainView = new MainView.MainView()
	mainView.render()
  }

  return {
    initialize: initialize
  };
});
