(function () {
    'use strict';

    angular
        .module('app', [
            'app.user',
            'app.admin',
            'ui.materialize',
            'ui.router',
            'firebase',
            'kendo.directives'
        ]);

})();
