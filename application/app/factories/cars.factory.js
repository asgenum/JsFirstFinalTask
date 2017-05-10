(function () {
    'use strict';

    angular
        .module('app')
        .factory('carsFactory', carsFactory);

    carsFactory.$inject = ['$firebaseObject', '$firebaseArray'];

    function carsFactory($firebaseObject, $firebaseArray) {
        var firebaseCarsRoot = new Firebase("https://carshop-c203c.firebaseio.com/cars");


        var service = {
            addCar: addCar,
            getCarById: getCarById,
            getAllCars: getAllCars,
            getMostViewedCars: getMostViewedCars,
            getCarsByKeyAndId: getCarsByKeyAndId
        };

        return service;

        function addCar(car) {

            getAllCars().then(function (carsArray) {
                var id = 0;

                if (!carsArray.length) {
                    id = 0;
                } else {
                    id = Number(carsArray[carsArray.length - 1].$id) + 1;
                }

                firebaseCarsRoot.child(id).set(car);

            });
        }

        function getCarById(id) {

            return $firebaseObject(firebaseCarsRoot.child(Number(id))).$loaded()
                .then(getCarByIdSuccess)
                .catch(getCarByIdError);

            function getCarByIdSuccess(object) {
                // console.log(object);
                if ('views' in object) {
                    object.views++;
                    object.$save();
                }
                return object;
            }

            function getCarByIdError(error) {
                console.error("Error:", error);
            }
        }

        function getCarsByKeyAndId(key, id) {

            return $firebaseArray(firebaseCarsRoot.orderByChild(key).equalTo(Number(id))).$loaded()
                .then(getCarsByBrandISuccess)
                .catch(getCarsByBrandIError);

            function getCarsByBrandISuccess(array) {
                console.log(array);
                return array;
            }

            function getCarsByBrandIError(error) {
                console.error("Error:", error);
            }
        }

        function getAllCars() {

            return $firebaseArray(firebaseCarsRoot).$loaded()
                .then(getAllCarsSuccess)
                .catch(getAllCarsFailed);


            function getAllCarsSuccess(array) {
                return array;
            }

            function getAllCarsFailed(error) {
                console.error("Error:", error);
            }

        }

        function getMostViewedCars() {
            var query = firebaseCarsRoot.orderByChild("views").limitToLast(25);

            return $firebaseArray(query).$loaded()
                .then(getAllCarsSuccess)
                .catch(getAllCarsFailed);


            function getAllCarsSuccess(array) {
                return array;
            }

            function getAllCarsFailed(error) {
                console.error("Error:", error);
            }
        }

    }

})();