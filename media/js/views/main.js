define([
  'jquery',
  'underscore',
  'backbone',
  'libs/mustache',
  'text!templates/main.mustache'
], function($, _, Backbone,Mustache,MainTemplate){
	var exports = {}
	exports.MainView = Backbone.View.extend({
		el : '#main-content',
		initialize: function(){
			console.log("?!")
		},
		render: function(){
			var _content = Mustache.to_html(MainTemplate,{test:'hello world'})
			this.$el.html(_content)
		}
	});
	return exports;
});
