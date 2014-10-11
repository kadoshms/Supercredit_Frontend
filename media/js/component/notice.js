define([
  'jquery',
  'underscore',
  'backbone',
  'libs/mustache',
  'libs/bootstrap-slider',
  'text!templates/component/notice.mustache',
], function($, _, Backbone,Mustache,BootstrapSlider,NoticeTemplate){
	var exports = {}
	exports.NoticeView = Backbone.View.extend({
		el : '#notice-container',
		initialize: function(type,content,sign){
			this.type = type;
			this.content = content;
			this.sign = sign;
		},
		destroy: function(){
			this.$el.empty()
		},
		render: function(){
			var output = Mustache.to_html(NoticeTemplate,{type:this.type,content:this.content,sign:this.sign})
			this.$el.html(output)
		}
	});
	return exports;
});
