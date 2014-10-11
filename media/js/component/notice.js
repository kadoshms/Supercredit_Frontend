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
		initialize: function(type,content,sign,identifier){
			this.type = type;
			this.content = content;
			this.sign = sign;
			this.identifier = identifier;
		},
		destroy: function(){
			var e = this.$el.find('[notice-id="'+this.identifier+'"]').remove()
		},
		render: function(){
			var e = this.$el.find('[notice-id="'+this.identifier+'"]')
			if(e.length == 0){
				var output = Mustache.to_html(NoticeTemplate,{type:this.type,content:this.content,sign:this.sign,identifier:this.identifier})
				this.$el.prepend(output)
			}
		}
	});
	return exports;
});
