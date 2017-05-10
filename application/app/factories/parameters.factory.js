(function () {
    'use strict';

    angular
        .module('app')
        .factory('parametersFactory', parametersFactory);

    parametersFactory.$inject = ['$firebaseObject', '$firebaseArray'];

    function parametersFactory($firebaseObject, $firebaseArray) {
        var firebaseShopRoot = new Firebase("https://carshop-c203c.firebaseio.com/");


        var service = {
            addBrand: addBrand,
            getBrandById: getBrandById,
            getAllBrands: getAllBrands,
            addModel: addModel,
            getModelById: getModelById,
            getModelsByBrandId: getModelsByBrandId,
            addFuel: addFuel,
            getFuelById: getFuelById,
            getAllFuels: getAllFuels,
            addTransmissionsType: addTransmissionsType,
            getTransmissionsTypeById: getTransmissionsTypeById,
            getAllTransmissions: getAllTransmissions
        };

        return service;

        function addBrand(brandName) {

            getAllBrands().then(function (brandsArray) {
                var id = 0;

                if (!brandsArray.length) {
                    id = 0;
                } else {
                    id = Number(brandsArray[brandsArray.length - 1].$id) + 1;
                }

                firebaseShopRoot.child('brands/' + id).set({
                    name: brandName,
                    models: {}
                });

            });
        }

        function getBrandById(id) {
            var firebaseObj = $firebaseObject(firebaseShopRoot.child('brands/' + id));

            return firebaseObj.$loaded()
                .then(getBrandByIdSuccess)
                .catch(getBrandByIdError);

            function getBrandByIdSuccess(object) {
                return object;
            }

            function getBrandByIdError(error) {
                console.error("Error:", error);
            }
        }

        function getAllBrands() {

            return $firebaseArray(firebaseShopRoot.child('/brands')).$loaded()
                .then(getAllBrandsSuccess)
                .catch(getAllBrandsFailed);


            function getAllBrandsSuccess(array) {
                return array;
            }

            function getAllBrandsFailed(error) {
                console.error("Error:", error);
            }

        }

        function getModelById(brandId, modelId) {
            var firebaseObj = $firebaseObject(
                firebaseShopRoot.child('brands/' + brandId + '/models/' + modelId));

            return firebaseObj.$loaded()
                .then(getModelByIdSuccess)
                .catch(getModelByIdError);

            function getModelByIdSuccess(object) {
                return object;
            }

            function getModelByIdError(error) {
                console.error("Error:", error);
            }
        }

        function addModel(brandId, modelName) {

            getModelsByBrandId(brandId).then(function (modelsArray) {
                var id = 0;
                console.log(modelsArray.length);

                if (!modelsArray.length) {
                    id = 0;
                } else {
                    console.log(modelsArray[modelsArray.length - 1]);
                    id = Number(modelsArray[modelsArray.length - 1].$id) + 1;
                }

                console.log(id);

                firebaseShopRoot.child('brands/' + brandId + '/models/' + id).set({
                    name: modelName,
                });

            });
        }

        function getModelsByBrandId(brandId) {

            return $firebaseArray(firebaseShopRoot.child('brands/' + brandId +'/models')).$loaded()
                .then(getModelsByBrandIdSuccess)
                .catch(getModelsByBrandIdFailed);


            function getModelsByBrandIdSuccess(array) {
                return array;
            }

            function getModelsByBrandIdFailed(error) {
                console.error("Error:", error);
            }

        }

        function addFuel(fuelName) {

            getAllFuels().then(function (fuelsArray) {
                var id = 0;

                if (!fuelsArray.length) {
                    id = 0;
                } else {
                    id = Number(fuelsArray[fuelsArray.length - 1].$id) + 1;
                }

                firebaseShopRoot.child('fuels/' + id).set({
                    name: fuelName,
                });

            });
        }

        function getFuelById(id) {
            var firebaseObj = $firebaseObject(firebaseShopRoot.child('fuels/' + id));

            return firebaseObj.$loaded()
                .then(getFuelByIdSuccess)
                .catch(getFuelByIdError);

            function getFuelByIdSuccess(object) {
                return object;
            }

            function getFuelByIdError(error) {
                console.error("Error:", error);
            }
        }

        function getAllFuels() {

            return $firebaseArray(firebaseShopRoot.child('/fuels')).$loaded()
                .then(getAllFuelsSuccess)
                .catch(getAllFuelsFailed);


            function getAllFuelsSuccess(array) {
                return array;
            }

            function getAllFuelsFailed(error) {
                console.error("Error:", error);
            }

        }

        function addTransmissionsType(transmissionsName) {

            getAllTransmissions().then(function (transmissionsArray) {
                var id = 0;

                if (!transmissionsArray.length) {
                    id = 0;
                } else {
                    id = Number(transmissionsArray[transmissionsArray.length - 1].$id) + 1;
                }

                firebaseShopRoot.child('transmissions/' + id).set({
                    name: transmissionsName,
                });

            });
        }

        function getTransmissionsTypeById(id) {
            var firebaseObj = $firebaseObject(firebaseShopRoot.child('transmissions/' + id));

            return firebaseObj.$loaded()
                .then(getTransmissionsTypeByIdSuccess)
                .catch(getTransmissionsTypeByIdError);

            function getTransmissionsTypeByIdSuccess(object) {
                return object;
            }

            function getTransmissionsTypeByIdError(error) {
                console.error("Error:", error);
            }
        }

        function getAllTransmissions() {

            return $firebaseArray(firebaseShopRoot.child('/transmissions')).$loaded()
                .then(getAllTransmissionsSuccess)
                .catch(getAllTransmissionsFailed);


            function getAllTransmissionsSuccess(array) {
                return array;
            }

            function getAllTransmissionsFailed(error) {
                console.error("Error:", error);
            }

        }
    }

})();