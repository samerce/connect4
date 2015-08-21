/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('connect4')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
