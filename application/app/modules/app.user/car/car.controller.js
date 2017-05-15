(function () {
    angular
        .module('app.user')
        .controller('CarController', CarController);

    CarController.$inject = ['$stateParams', 'carsFactory', 'parametersFactory'];

    function CarController($stateParams, carsFactory, parametersFactory) {
        var vm = this;
        vm.carId = $stateParams.id;
        vm.car = {};
        vm.brandsArray = [];
        vm.fuelsArray = [];
        vm.transmissionsArray = [];
        vm.isLoading = true;
        vm.showCarInfo = showCarInfo;
        vm.getCarById = getCarById;
        vm.getAllBrands = getAllBrands;
        vm.getAllFuels = getAllFuels;
        vm.getAllTransmissions = getAllTransmissions;

        vm.showCarInfo();

        function showCarInfo() {
            if (vm.carId) {
                getCarById(vm.carId).then(function (car) {
                    if ('brand' in vm.car) {
                        getAllBrands().then(function (array) {
                            getAllFuels().then(function (array) {
                                getAllTransmissions().then(function (array) {
                                    vm.isLoading = false;
                                })
                            })
                        })
                    } else {
                        vm.isLoading = false;
                        vm.carIsValid = false;
                    }
                });
            } else {
                vm.isLoading = false;
                vm.carIsValid = false;
            }
        }

        function getCarById(id) {
            return carsFactory.getCarById(id)
                .then(getCarByIdSuccess)
                .catch(getCarByIdError);

            function getCarByIdSuccess(car) {
                vm.car = car;
                vm.carIsValid = true;
                return vm.car;
            }

            function getCarByIdError(error) {
                console.log('Error: ' + error);
                vm.carIsValid = false;
            }
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