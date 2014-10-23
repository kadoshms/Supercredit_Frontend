define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'pParse',
  'libs/mustache',
  'component/purchase-types',
  'component/slider',
  'component/notice',
  'component/timer',
  'text!templates/main.mustache'
], function($, _, Backbone,Config,pParse,Mustache,PurchaseTypes,Slider,Notice,Timer,MainTemplate){
	var exports = {}
	exports.MainView = Backbone.View.extend({
		el : '#main-content',
		events:{
			"click #btn-purchase": "purchase",
			"blur #credit-card":  "purchase",
			"input #slider-value" : "updateSlider"
		},
		initialize: function(){
			this.sliderModel = new Slider.SliderModel(Config.SLIDER_MAX)
			this.listenTo(this.sliderModel,"change",this.updateSliderValue)
			this.cardReading()
			console.log(Config.PURCHASES_CLASS_REST+'niojqU7Vhe')
		},
		updateSlider: function(e){
			var current = $(e.currentTarget)
			this.sliderModel.setValue(current.val())
		},
		cardReading: function(){
			var _credit = [];
			var view = this;
			var delay = (function(){
				  var timer = 0;
				  return function(callback, ms){
				    clearTimeout (timer);
				    timer = setTimeout(callback, ms);
				  };
				})();
			$(window).keypress(function(e){
				view.timeDiff = Date.now()-e.timeStamp;
				if(typeof(_credit) != "undefined")
					_credit.push({key: String.fromCharCode(e.which), time:e.timeStamp});
				else{
					_credit = []
					_credit.push({key: String.fromCharCode(e.which), time:e.timeStamp});
				}
				 delay(function(){
					var avg = 0, creditString = _credit[0].key;
					for(var i = 1; i < _credit.length; i++){
						avg +=_credit[i].time-_credit[i-1].time;
						creditString+= _credit[i].key;
					}
					avg = avg/_credit.length;
					if(avg <= Config.READER_AVG)
						view.autoPurchase(creditString)
					//reset vars
					creditString = '';
					_credit = []
					avg = 0;
				}, Config.TIME_DELAY );

			})
		},
		enableInput: function(){
			var input = this.$el.find("input[name=credit_hash]")
			input.prop('disabled',false).focus()
		},
		autoPurchase: function(credit){
			var view = this;
			var input = view.$el.find("input[name=credit_hash]")
			setTimeout(function(){
				input.prop('disabled',false).focus().val(credit)
				input.blur()
			},Config.TIME_DELAY)
		},
		enableCreditCardInput: function(){
			this.$el.find("input[name=credit_hash]").prop('disabled',false);
		},
		updateSliderValue: function(){
			var _sliderValue = this.$el.find('#slider-value').val(this.sliderModel.get("value"))
		},
		changeButton: function(toLoading){
			var _btn = this.$el.find('#btn-purchase');
			var _logo =this.$el.find('#logo');
			var _btnIcon = this.$el.find('#btn-icon');
			var _btnTxt = _btn.find('#btn-text')
			if(toLoading){
				_btnTxt.text('Loading...')
				_btn.removeClass('btn-success').addClass('btn-warning');
				_logo.addClass('floating')
				_btnIcon.removeClass('glyphicon-shopping-cart').addClass('glyphicon-refresh').addClass('loadingAnim')
				$('li[type=list-item]').each(function(){
					var input = $(this).find('input')
					   if(!$(input).is(':checked')){
						   $(this).slideUp()
					   }else{
						  $(this).addClass('categoryAnim')
					   }
				});
				$('input[name=radioName]:checked', '#myForm').val()
			}else{
				_btnTxt.text('Purchase Now')
				_btn.removeClass('btn-warning').addClass('btn-success');
				_btnIcon.addClass('glyphicon-shopping-cart').removeClass('glyphicon-refresh').removeClass('loadingAnim')
				_logo.removeClass('floating')
				$('li[type=list-item]').each(function(){
					 $(this).slideDown()
					  var input = $(this).find('input')
					  var span = $(this).find('span')
					  if($(input).is(':checked'))
						   $(this).removeClass('categoryAnim')
					
				});
			}
		},
		clearNotices: function(){
			this.$el.find('#notice-container').empty()
		},
		purchase: function(){
			var view = this;
			var noticeNoType = new Notice.NoticeView("warning","You Havent Chosent a Purchase Type!","warning-sign","no-type")
			var noticeEmptyCredit = new Notice.NoticeView("warning","You havent filled your Supercredit Card number!","warning-sign","no-credit")
			var noticePending = new Notice.NoticeView("warning","Purchase Denied, But waiting for your response...","warning-sign","pending")
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
					if(res.status == Config.STATUS_PURCHASE_PENDING){
						noticePending.render()
						var _timerModel = new Timer.TimerModel(Config.AUTO_APPROVE_TIME)
						var _timer = new Timer.TimerView({model:_timerModel})
						_timer.render()
						view.pendingTimeout(res.purchase_id)
					}
					if(res.status == Config.STATUS_NO_CREDENTIALS)
						noticeNoCred.render()
					if(res.status == Config.STATUS_PURCHASE_APPROVED){
						if(typeof(res.purchase_id) != "undefined")
							noticeApproved.setContent("Purchase Approved, Even though you have crossed your Budget.")
						noticeApproved.render();
					}
						
					view.$el.find("input[name=credit_hash]").val('').prop('disabled',true)
					
				},
			})
			;
		},
		pendingTimeout: function(purchase_id){
			var view = this;
			var _time = 0;
			var _requestSent = false;
			//check class in parse every X seconds
			var _interval = setInterval(function(){
				_time += Config.PENDING_TIME;
				if(_time >= Config.AUTO_APPROVE_TIME && !_requestSent){
					$.ajax({
					     type: "POST",
					     crossDomain: true,
					     url: Config.AUTO_APPROVE_URL+purchase_id,
					    success: function(){
					    	view.purchaseResolved(Config.STATUS_PURCHASE_APPROVED)
					    	_requestSent = true;
					    }
					});
				}
				$.ajax({
			         url: Config.PURCHASES_CLASS_REST+purchase_id,
			         type: "GET",
			         beforeSend: function (xhr) {
			        	    xhr.setRequestHeader ("X-Parse-Application-Id", Config.APP_ID);
			        	    xhr.setRequestHeader ("X-Parse-REST-API-Key", Config.REST_KEY);
			         },
			         success: function(data) {
			        	 if(data.status != Config.STATUS_PURCHASE_PENDING){
			        		 clearInterval(_interval);
			        		 view.purchaseResolved(data.status)
			        	 }
			        		
			         }
			    });
			},Config.PENDING_TIME * 1000)
		},
		purchaseResolved: function(status){
			var view = this;
			view.clearNotices()
			var alert = status == Config.STATUS_PURCHASE_DENIED ?
					new Notice.NoticeView("info","You Decided to Cancel this Purchase.","ban-circle","purchase_denied")
					:
					new Notice.NoticeView("info","You Decided to Approve this Purchase Anyway...","ok","purchase-approved")	
			alert.render()
		},
		render: function(){
			var view = this;
			var _maxLength = String(Config.SLIDER_MAX).length
			var _content = Mustache.to_html(MainTemplate,{slider_min:Config.SLIDER_MIN,max_length:_maxLength})
			this.$el.html(_content)
			var _typesContainer = this.$el.find('#types')
			var purchaseTypesView = new PurchaseTypes.PurchaseTypesView({el:_typesContainer})
			var slider = new Slider.SliderView({model:this.sliderModel,options:{
				max 	: Config.SLIDER_MAX,
				min		: Config.SLIDER_MIN,
				handle	: 'square',
				tooltip : 'hide'
			}})
		}
	});
	return exports;
});
