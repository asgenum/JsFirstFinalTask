
(function() {
    angular
        .module('app.user')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['carsFactory', 'parametersFactory'];

    function HomeController(carsFactory, parametersFactory) {
        var vm = this;
        vm.searchQuery = null;
        vm.carsArray = [];
        vm.brandsArray = [];
        vm.fuelsArray = [];
        vm.transmissionsArray = [];
        vm.isLoading = true;
        vm.showMostViewedCars = showMostViewedCars;
        vm.getAllBrands = getAllBrands;
        vm.getAllFuels = getAllFuels;
        vm.getAllTransmissions = getAllTransmissions;

        vm.showMostViewedCars();

        
        function showMostViewedCars() {
             carsFactory.getMostViewedCars().then(function (carArray) {
                 getAllBrands().then(function (array) {
                     getAllFuels().then(function (array) {
                         getAllTransmissions().then(function (array) {
                            vm.carsArray = carArray;
                             vm.isLoading = false;
                        })
                    })
                })
            });
        }

        function getAllBrands() {
            return parametersFactory.getAllBrands().then(function (array) {
                vm.brandsArray = array;
                return array;
            });
        }

        function getAllFuels() {
            return parametersFactory.getAllFuels().then(function (array) {
                vm.fuelsArray = array;
                return vm.fuelsArray;
            });
        }

        function getAllTransmissions() {
            return parametersFactory.getAllTransmissions().then(function (array) {
                vm.transmissionsArray = array;
                return vm.transmissionsArray;
            });
        }

    }
})();