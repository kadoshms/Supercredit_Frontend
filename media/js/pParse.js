/**
 * Parse.js
 *
 * Parse Integration initializer
 */
define(
  [
   'jquery',
   'parse'
  ], function ($, Parse) {
      "use strict";
      var params = {}
      Parse.$ = $;
      params.appId = "CtKrDhLEMo8k05hV4HekNMkx4MXmpBercuzruQ2T";
      params.jsKey = "DXiwCPUXTc5KexElBXhOVg6y9UWi0ym4bbbuD8LL";
      Parse.initialize(params.appId,params.jsKey);
      return {parse:Parse,params:params};
  }
);
