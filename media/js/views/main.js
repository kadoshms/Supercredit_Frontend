define([
  'jquery',
  'underscore',
  'backbone',
  'libs/mustache',
  'component/purchase-types',
  'text!templates/main.mustache'
], function($, _, Backbone,Mustache,PurchaseTypes,MainTemplate){
	var exports = {}
	exports.MainView = Backbone.View.extend({
		el : '#main-content',
		initialize: function(){
		},
		render: function(){
			var _content = Mustache.to_html(MainTemplate,{test:'hello world'})
			this.$el.html(_content)
			var _typesContainer = this.$el.find('#types')
			var purchaseTypesView = new PurchaseTypes.PurchaseTypesView({el:_typesContainer})
		}
	});
	return exports;
});
