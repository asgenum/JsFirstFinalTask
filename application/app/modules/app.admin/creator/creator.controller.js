(function () {
    angular
        .module('app.admin')
        .controller('CarCreatorController', CarCreatorController);

    CarCreatorController.$inject = ['$state', 'carsFactory', 'parametersFactory', '$scope', '$interval'];
    function CarCreatorController($state, carsFactory, parametersFactory, $scope, $interval) {
        var vm = this;
        vm.brandsArray = [];
        vm.modelsArray = [];
        vm.transmissionsArray = [];
        vm.selectedBrandId = null;
        vm.selectedModelId = null;
        vm.carPrice = null;
        vm.year = null;
        vm.mileage = null;
        vm.selectedFuelId = null;
        vm.capacity = null;
        vm.selectedTransmissionsId = null;
        vm.fuelsArray = [];
        vm.car = {
            views: 0
        };
        vm.createCar = createCar;
        vm.getAllBrands = getAllBrands;
        vm.initCarModelChange = initCarModelChange;
        vm.getCarModelsByBrandId = getCarModelsByBrandId;
        vm.getAllFuels = getAllFuels;
        vm.getAllTransmissions = getAllTransmissions;

        vm.getAllBrands();
        vm.initCarModelChange();
        vm.getAllFuels();
        vm.getAllTransmissions();


        function createCar() {
            if (vm.selectedBrandId && vm.selectedModelId && vm.selectedFuelId && vm.selectedTransmissionsId) {
                vm.car.brand = vm.brandsArray[vm.selectedBrandId].name;
                vm.car.model = vm.modelsArray[vm.selectedModelId].name;
                vm.car.price = vm.carPrice;
                vm.car.year = vm.year;
                vm.car.mileage = vm.mileage;
                vm.car.fuel = vm.fuelsArray[vm.selectedFuelId].name;
                vm.car.capacity = vm.capacity;
                vm.car.transmission = vm.transmissionsArray[vm.selectedTransmissionsId].name;

                carsFactory.addCar(vm.car);
                $state.go('admin');
            }
        }

        function initCarModelChange() {
            $scope.$watch('vm.selectedBrandId', function (current, original) {
                getCarModelsByBrandId(current);
            });
        }

        function getAllBrands() {
            return parametersFactory.getAllBrands().then(function (array) {
                vm.brandsArray = array;
            });
        }

        function getCarModelsByBrandId(id) {
            return parametersFactory.getModelsByBrandId(id).then(function (array) {
                vm.modelsArray = array;
            });
        }

        function getAllFuels() {
            return parametersFactory.getAllFuels().then(function (array) {
                vm.fuelsArray = array;
            });
        }

        function getAllTransmissions() {
            return parametersFactory.getAllTransmissions().then(function (array) {
                vm.transmissionsArray = array;
                //createCars();
            });
        }

        /*function createCars() {
            $interval(function () {
                vm.car.brandId = getRandomInt(0, 10);
                vm.car.brand = vm.brandsArray[vm.car.brandId].name;
                vm.car.modelId = getRandomInt(0, 5);
                vm.car.model = vm.brandsArray[vm.car.brandId].models[vm.car.modelId].name;
                vm.car.price = getRandomInt(0, 200000);
                vm.car.year = getRandomInt(1950, 2017);
                vm.car.mileage = getRandomInt(1, 300000);
                vm.car.fuelId = getRandomInt(0, 5);
                vm.car.fuel = vm.fuelsArray[vm.car.fuelId].name;
                vm.car.capacity = getRandomInt(1, 6);
                vm.car.transmissionId = getRandomInt(0, 1);
                vm.car.transmission = vm.transmissionsArray[vm.car.transmissionId].name;

                carsFactory.addCar(vm.car);
            }, 4000);

        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }*/
    }
})();