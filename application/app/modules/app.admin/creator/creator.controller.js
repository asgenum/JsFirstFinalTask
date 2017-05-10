(function () {
    angular
        .module('app.admin')
        .controller('CarCreatorController', CarCreatorController);

    CarCreatorController.$inject = ['$state', 'carsFactory', 'parametersFactory', '$scope'];
    function CarCreatorController($state, carsFactory, parametersFactory, $scope) {
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

        getAllBrands();
        initCarModelChange();
        getAllFuels();
        getAllTransmissions();

        function createCar() {
            if(vm.selectedBrandId && vm.selectedModelId && vm.selectedFuelId && vm.selectedTransmissionsId) {
                vm.car.brandId = vm.selectedBrandId;
                vm.car.modelId = vm.selectedModelId;
                vm.car.price = vm.carPrice;
                vm.car.year = vm.year;
                vm.car.mileage = vm.mileage;
                vm.car.fuelId = vm.selectedFuelId;
                vm.car.capacity = vm.capacity;
                vm.car.transmissionId = vm.selectedTransmissionsId;

                carsFactory.addCar(vm.car);
                $state.go('admin');
            }
        }

        function getAllBrands() {
            parametersFactory.getAllBrands().then(function (array) {
                vm.brandsArray = array;
            });
        }

        function initCarModelChange() {
            $scope.$watch('vm.selectedBrandId', function (current, original) {
                getCarModelsByBrandId(current);
            });
        }

        function getCarModelsByBrandId(id) {
            parametersFactory.getModelsByBrandId(id).then(function (array) {
                vm.modelsArray = array;
            });
        }

        function getAllFuels() {
            parametersFactory.getAllFuels().then(function (array) {
                vm.fuelsArray = array;
            });
        }

        function getAllTransmissions() {
            parametersFactory.getAllTransmissions().then(function (array) {
                vm.transmissionsArray = array;
            });
        }

        /*function createCars() {
            for (var i = 0; i < 100; i++) {
                vm.car.brandId = getRandomInt(0, 10);
                vm.car.modelId = getRandomInt(0, 5);
                vm.car.price = getRandomInt(0, 200000);
                vm.car.year = getRandomInt(1950, 2017);
                vm.car.mileage = getRandomInt(0, 300000);
                vm.car.fuelId = getRandomInt(0, 5);
                vm.car.capacity = getRandomInt(0, 6);
                vm.car.transmissionId = getRandomInt(0, 1);

                carsFactory.addCar(vm.car);

            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }*/
    }
})();