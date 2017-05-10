(function() {
  'use strict';

  angular
    .module('app')
    .factory('servicesFactory', servicesFactory);
  
  servicesFactory.$inject = [];

  function servicesFactory() {
    return {
      getText: getText
    };

    function getText() {
        return "THIS IS TEXT!!1!"
    }
  }

})();