(function () {
    angular
        .module('app.admin')
        .controller('ParametersController', ParametersController);

    ParametersController.$inject = ['parametersFactory'];
    function ParametersController(parametersFactory) {
        var vm = this;
        vm.brandsArray = {};
        vm.brandName = null;
        vm.selectedBrandId = null;
        vm.modelName = null;
        vm.fuelType = null;
        vm.transmissionsType = null;
        vm.addBrand = addBrand;
        vm.getAllBrands = getAllBrands;
        vm.addCarModel = addCarModel;
        vm.addFuelsType = addFuelsType;
        vm.addTransmissionsType = addTransmissionsType;

        vm.getAllBrands();

        function addBrand() {
            if(vm.brandName) {
                parametersFactory.addBrand(vm.brandName)
            }
            vm.brandName = null;
        }

        function getAllBrands() {
            parametersFactory.getAllBrands().then(function (array) {
                vm.brandsArray = array;
            });
        }

        function addCarModel() {
            if(vm.selectedBrandId) {
                console.log(vm.selectedBrandId);
                parametersFactory.addModel(vm.selectedBrandId, vm.modelName);
            }
            vm.selectedBrandId = null;
            vm.modelName = null;
        }

        function addFuelsType() {
            if(vm.fuelType) {
                parametersFactory.addFuel(vm.fuelType)
            }
            vm.fuelType = null;
        }

        function addTransmissionsType() {
            if(vm.transmissionsType) {
                parametersFactory.addTransmissionsType(vm.transmissionsType);
            }
            vm.transmissionsType = null;
        }
    }
})();