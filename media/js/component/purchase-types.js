/*
			var ParseTodo = Parse.Object.extend({
				  className: "PurchaseTypes"
				});
			  var ParseTodoCollection = Parse.Collection.extend({
				  model: ParseTodo
				});
				 
				var todos = new ParseTodoCollection();
				 
				// Construct a query to get the current user's todo items
				var query = new Parse.Query(ParseTodo);
				todos.query = query;
				todos.fetch();
				console.log(todos)*/
define([
  'jquery',
  'underscore',
  'backbone',
  'libs/mustache',
  'pParse',
  'text!templates/component/list.mustache'
], function($, _, Backbone,Mustache,pParse,ListTemplate){
	var exports = {}
	exports.PurchaseTypesObject = Parse.Object.extend({
		  className: "PurchaseTypes"
	});
	exports.PurchaseTypesCollection = Parse.Collection.extend({
		  model: this.PurchaseTypesObject
	});
	exports.types = new exports.PurchaseTypesCollection();
	 
	// Construct a query to get the current user's todo items
	var query = new Parse.Query(exports.PurchaseTypesObject);
	exports.types.query = query;
	exports.PurchaseTypesView = Backbone.View.extend({
		collection : exports.types,
		initialize: function(){
			var view = this;
			this.collection.fetch().done(function(){
				      view.render();
			});
		},
		render: function(){
			var _types = this.collection;
			var output = Mustache.to_html(ListTemplate,{items:_types.toJSON()})
		    this.collection.each(function(log) {
		        
		    });
			this.$el.html(output)
		}
	});
	return exports;
});
