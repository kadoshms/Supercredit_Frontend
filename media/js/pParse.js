/**
 * Parse.js
 *
 * Parse Integration initializer
 */
define(
  [
   'jquery',
   'parse',
   'config'
  ], function ($, Parse, Config) {
      "use strict";
      var params = {}
      Parse.$ = $;
      params.appId = Config.APP_ID;
      params.jskey = Config.JS_KEY;
      Parse.initialize(Config.APP_ID,Config.JS_KEY);
      return {parse:Parse,params:params};
  }
);
