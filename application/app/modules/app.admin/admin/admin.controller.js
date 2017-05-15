(function () {
    angular
        .module('app.admin')
        .controller('AdminController', AdminController);
    AdminController.$inject = ['carsFactory', 'parametersFactory', '$timeout']

    function AdminController(carsFactory, parametersFactory, $timeout) {
        var vm = this;
        vm.isLoading = true;
        vm.carsArray = [];
        vm.gridOptions = undefined;

        vm.showAllCars = showAllCars;
        vm.getAllBrands = getAllBrands;
        vm.removeCarById = removeCarById;
        vm.setGridOptions = setGridOptions;
        vm.saveCar = saveCar;

        vm.showAllCars();


        function showAllCars() {
            carsFactory.getAllCars().then(function (carArray) {
                getAllBrands().then(function (array) {
                    vm.carsArray = carArray;
                    vm.isLoading = false;
                    vm.setGridOptions();
                })
            });
        }

        function getAllBrands() {
            return parametersFactory.getAllBrands().then(function (array) {
                vm.brandsArray = array;
                return array;
            });
        }

        function saveCar(car) {
            vm.carsArray.$save(vm.carsArray.$indexFor(car.$id)).then(function (e) {
                vm.carsArray.$save(vm.carsArray.$indexFor(car.$id)).then(function (e) {
                    console.log(e);
                });
            });
        }

        function removeCarById(id) {
            vm.carsArray.$remove(vm.carsArray.$indexFor(id));
        }


        function setGridOptions() {
            vm.gridOptions = {
                dataSource: {
                    data: vm.carsArray,
                    schema: {
                        model: {
                            id: '$id',
                            fields: {
                                $id: {type: 'number', editable: false},
                                brand: {type: 'string', validation: {required: true}},
                                model: {type: 'string', validation: {required: true}},
                                price: {type: 'number', validation: {required: true, min: 1}},
                                year: {type: 'number', validation: {required: true, min: 1950}},
                                mileage: {type: 'number', validation: {required: true, min: 5}},
                                fuel: {type: 'string', validation: {required: true}},
                                capacity: {type: 'number', validation: {required: true, min: 0.1, max: 6}},
                                transmission: {type: 'string', validation: {required: true}}
                            }
                        }
                    },
                    pageSize: 20
                },
                scrollable: true,
                sortable: true,
                height: 650,
                resizable: true,
                reorderable: true,
                columnMenu: true,
                filterable: {
                    mode: "row"
                },
                groupable: true,
                pageable: {
                    input: true,
                    numeric: false
                },
                columns: [{
                    field: '$id', title: 'ID', width: 75
                }, {
                    field: 'brand', title: 'Производитель'
                }, {
                    field: 'model', title: 'Модель'
                }, {
                    field: 'price', title: 'Цена', width: 120, format: '{0:c}'
                }, {
                    field: 'year', title: 'Год выпуска'
                }, {
                    field: 'mileage', title: 'Пробег', width: 100
                }, {
                    field: 'fuel', title: 'Тип топлива'
                }, {
                    field: 'capacity', title: 'Обьём двигателя', width: 100
                }, {
                    field: 'transmission', title: 'Тип трансмиссии'
                }, {
                    command: ['edit', 'destroy'], title: '', width: '295px'
                }],
                editable: 'inline',
                remove: function (element) {
                    vm.removeCarById(element.model.$id);
                },
                save: function (element) {
                    vm.saveCar(element.model);
                }
            };
        }
    }
})();