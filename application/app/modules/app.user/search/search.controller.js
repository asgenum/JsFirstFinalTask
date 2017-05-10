
(function() {
    angular
        .module('app.user')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$stateParams', 'parametersFactory', '$scope', 'carsFactory'];
    function SearchController($stateParams, parametersFactory, $scope, carsFactory) {
        var vm = this;
        vm.searchQuery = $stateParams.text;
        vm.selectedBrandId = null;
        vm.selectedModelId = null;
        vm.carPrice = null;
        vm.year = null;
        vm.mileage = null;
        vm.selectedFuelId = null;
        vm.capacity = null;
        vm.selectedTransmissionsId = null;
        vm.brandsArray = [];
        vm.modelsArray = [];
        vm.transmissionsArray = [];
        vm.fuelsArray = [];
        vm.carsArray = [];
        vm.isLoading = true;

        vm.getAllBrands = getAllBrands;
        vm.initCarModelChange = initCarModelChange;
        vm.getCarModelsByBrandId = getCarModelsByBrandId;
        vm.getAllFuels = getAllFuels;
        vm.getAllTransmissions = getAllTransmissions;
        vm.showAllCars = showAllCars;

        vm.showAllCars();
        vm.initCarModelChange();


        function showAllCars() {
            carsFactory.getAllCars().then(function (carArray) {
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


        function initCarModelChange() {
            $scope.$watch('vm.selectedBrandId', function (current, original) {
                if(current) {
                    carsFactory.getCarsByKeyAndId('brandId', current).then(function (array) {
                        vm.carsArray = array;
                    });
                }
                getCarModelsByBrandId(current);

            });
            $scope.$watch('vm.selectedModelId', function (current, original) {
                if(current) {
                    carsFactory.getCarsByKeyAndId('modelId', current).then(function (array) {
                        vm.carsArray = array;
                    });
                }

            });
            $scope.$watch('vm.selectedFuelId', function (current, original) {
                if(current) {
                    carsFactory.getCarsByKeyAndId('fuelId', current).then(function (array) {
                        vm.carsArray = array;
                    });
                }

            });

            $scope.$watch('vm.selectedTransmissionsId', function (current, original) {
                if(current) {
                    carsFactory.getCarsByKeyAndId('transmissionId', current).then(function (array) {
                        vm.carsArray = array;
                    });
                }

            });

        }

        function getCarModelsByBrandId(id) {
            parametersFactory.getModelsByBrandId(id).then(function (array) {
                vm.modelsArray = array;
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