define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'libs/mustache',
  'component/purchase-types',
  'component/slider',
  'component/notice',
  'text!templates/main.mustache'
], function($, _, Backbone,Config,Mustache,PurchaseTypes,Slider,Notice,MainTemplate){
	var exports = {}
	exports.MainView = Backbone.View.extend({
		SLIDER_MIN: 1,
		SLIDER_MAX: 2000,
		el : '#main-content',
		events:{
			"click #btn-purchase": "purchase",
		},
		initialize: function(){
			this.sliderModel = new Slider.SliderModel()
			this.listenTo(this.sliderModel,"change",this.updateSliderValue)
		},
		updateSliderValue: function(){
			var _sliderValue = this.$el.find('#slider-value').val(this.sliderModel.get("value")+" ₪")
		},
		purchase: function(){
			var noticeNoType = new Notice.NoticeView("You Havent Chosent a Purchase Type!")
			var _value = typeof(this.sliderModel.get("value")) == "undefined" ? 0 : this.sliderModel.get("value")
			var _type = this.$el.find("input[name=purchase-type]:checked").val()
			if(typeof(_type)=="undefined"){
				noticeNoType.render()
				return false;
			}
			else
				noticeNoType.destroy()
			$.ajax({
				type: "POST",
				url: Config.url+"purchases/",
				data: $( "#purchase-form" ).serialize(),
				fail: function(e){
					console.log(e)
				},
				//success: success,
				//ataType: dataType
			})
			;
		},
		render: function(){
			var view = this;
			var _content = Mustache.to_html(MainTemplate,{slider_min:this.SLIDER_MIN})
			this.$el.html(_content)
			var _typesContainer = this.$el.find('#types')
			var purchaseTypesView = new PurchaseTypes.PurchaseTypesView({el:_typesContainer})
			var slider = new Slider.SliderView({model:this.sliderModel,options:{
				max 	: view.SLIDER_MAX,
				min		: view.SLIDER_MIN,
				handle	: 'square',
				tooltip : 'hide'
			}})
		}
	});
	return exports;
});
