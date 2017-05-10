(function () {
    "use strict";

    angular
        .module("app.user")
        .config(userConfig);

    userConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function userConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: "app/modules/app.user/home/home.html",
                controller: "HomeController as vm"
            })
            .state('search', {
                url: '/search',
                templateUrl: "app/modules/app.user/search/search.html",
                controller: "SearchController as vm",
            })
            .state('searchWithParams', {
                url: '/search/{text}?mark&year',
                templateUrl: "app/modules/app.user/search/search.html",
                controller: "SearchController as vm",
                params: {
                    text: null,
                    mark: null,
                    year: null
                }
            })
            .state('car', {
                url: '/car/{id}',
                templateUrl: "app/modules/app.user/car/car.html",
                controller: "CarController as vm",
                params: {
                    id: null
                }
            });
    }
})();