define([
  'jquery',
  'underscore',
  'backbone',
  'libs/mustache',
  'libs/bootstrap-slider',
  'text!templates/component/slider.mustache',
], function($, _, Backbone,Mustache,BootstrapSlider,SliderTemplate){
	var exports = {}
	exports.SliderModel = Backbone.Model.extend({
		setValue : function(value){
			this.set("value",value)
		},
		getValue : function(){
			return this.get("value")
		}
	});
	exports.SliderView = Backbone.View.extend({
		el : '#slider-container',
		initialize: function(viewParams){
			this.sliderOptions = viewParams.options;
			this.model = viewParams.model
			this.render()
		},
		render: function(){
			var _options = this.sliderOptions;
			var content = Mustache.to_html(SliderTemplate,{max:_options.max,min:_options.min})
			this.$el.html(content)
			var _sliderContainer = this.$el.find('#slider')
			var model = this.model;
			_sliderContainer.slider(_options).
				on('slideStop',function(e){
					model.setValue(e.value)
				}).
				on('slide',function(e){
					model.setValue(e.value)
				});
		}
	});
	return exports;
});
