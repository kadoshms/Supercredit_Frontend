define([
  'jquery',
  'underscore',
  'backbone',
  'libs/mustache',
  'component/purchase-types',
  'component/slider',
  'text!templates/main.mustache'
], function($, _, Backbone,Mustache,PurchaseTypes,Slider,MainTemplate){
	var exports = {}
	exports.MainView = Backbone.View.extend({
		el : '#main-content',
		initialize: function(){
		},
		render: function(){
			var _content = Mustache.to_html(MainTemplate,{})
			this.$el.html(_content)
			var _typesContainer = this.$el.find('#types')
			var purchaseTypesView = new PurchaseTypes.PurchaseTypesView({el:_typesContainer})
			var sliderModel = new Slider.SliderModel()
			var slider = new Slider.SliderView({model:sliderModel,options:{
				max 	: 2000,
				handle	: 'square',
			}})
		}
	});
	return exports;
});
