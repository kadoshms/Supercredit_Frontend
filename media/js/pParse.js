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
      Parse.$ = $;
      Parse.initialize("CtKrDhLEMo8k05hV4HekNMkx4MXmpBercuzruQ2T", "DXiwCPUXTc5KexElBXhOVg6y9UWi0ym4bbbuD8LL");
      return Parse;
  }
);
