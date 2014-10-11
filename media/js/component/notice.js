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
		initialize: function(content){
			this.content = content;
		},
		destroy: function(){
			this.$el.empty()
		},
		render: function(){
			var output = Mustache.to_html(NoticeTemplate,{content:this.content})
			this.$el.html(output)
		}
	});
	return exports;
});
