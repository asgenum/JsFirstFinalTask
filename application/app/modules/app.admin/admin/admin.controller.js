(function () {
    angular
        .module('app.admin')
        .controller('AdminController', AdminController);
    AdminController.$inject = ['carsFactory', 'parametersFactory']

    function AdminController(carsFactory, parametersFactory) {
        var vm = this;
        vm.isLoading = true;
        vm.carsArray = [];

        vm.showAllCars = showAllCars;
        vm.getAllBrands = getAllBrands;
        vm.removeCarById = removeCarById;

        vm.showAllCars();


        function showAllCars() {
            carsFactory.getAllCars().then(function (carArray) {
                getAllBrands().then(function (array) {
                    vm.carsArray = carArray;
                    vm.isLoading = false;
                })
            });
        }

        function getAllBrands() {
            return parametersFactory.getAllBrands().then(function (array) {
                vm.brandsArray = array;
                return array;
            });
        }

        function removeCarById(id) {
            vm.carsArray.$remove(vm.carsArray.$indexFor(id));
        }
    }
})();