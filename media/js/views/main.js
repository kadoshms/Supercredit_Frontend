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
			var _sliderValue = this.$el.find('#slider-value').val(this.sliderModel.get("value"))
		},
		changeButton: function(toLoading){
			var _btn = this.$el.find('#btn-purchase');
			var _btnIcon = this.$el.find('#btn-icon');
			var _btnTxt = _btn.find('#btn-text')
			if(toLoading){
				_btnTxt.text('Loading...')
				_btn.removeClass('btn-success').addClass('btn-warning');
				_btnIcon.removeClass('glyphicon-shopping-cart').addClass('glyphicon-refresh').addClass('loadingAnim')		
			}else{
				_btnTxt.text('Purchase Now')
				_btn.removeClass('btn-warning').addClass('btn-success');
				_btnIcon.addClass('glyphicon-shopping-cart').removeClass('glyphicon-refresh').removeClass('loadingAnim')				
			}
		},
		clearNotices: function(){
			this.$el.find('#notice-container').empty()
		},
		purchase: function(){
			var view = this;
			var noticeNoType = new Notice.NoticeView("warning","You Havent Chosent a Purchase Type!","warning-sign","no-type")
			var noticeEmptyCredit = new Notice.NoticeView("warning","You havent filled your Supercredit Card number!","warning-sign","no-credit")
			var noticeApproved = new Notice.NoticeView("success","Purchase Approved!","ok","purchase-approved")
			var noticeNoCred = new Notice.NoticeView("warning","Credit card number was not authorized.","warning-sign","no-credentials")
			var noticePurchaseDenied = new Notice.NoticeView("danger","Your Purchase was Denied! A Push Notification Should Arrive now.","ban-circle","purchase_denied")
			var _value = typeof(this.sliderModel.get("value")) == "undefined" ? 0 : this.sliderModel.get("value")
			var _type = this.$el.find("input[name=purchase_type]:checked").val()
			var _credit = this.$el.find("input[name=credit_hash]").val()
			this.changeButton(true)
			var flag = true;
			if(typeof(_type)=="undefined"){
				noticeNoType.render()
				view.changeButton(false)
				flag = false;
			}else
				noticeNoType.destroy()
			if(_credit==""){
				noticeEmptyCredit.render()
				view.changeButton(false)
				flag = false;
			}else
				noticeEmptyCredit.destroy()
			if(!flag) return false;
			$.ajax({
				type: "POST",
				url: Config.url+"purchases/",
				data: $( "#purchase-form" ).serialize(),
				error: function(e){
					console.log(e)
				},
				success: function(res){
					view.clearNotices()
					view.changeButton(false)
					if(res.status == Config.STATUS_PURCHASE_DENIED)
						noticePurchaseDenied.render();
					if(res.status == Config.STATUS_NO_CREDENTIALS)
						noticeNoCred.render()
					if(res.status == Config.STATUS_PURCHASE_APPROVED)
						noticeApproved.render()	
				},
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
