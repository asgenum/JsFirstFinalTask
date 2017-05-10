(function () {
    angular
        .module('app.admin')
        .controller('EditorController', EditorController);

    EditorController.$inject = ['$stateParams'];
    function EditorController($stateParams) {
        var vm = this;
        vm.text = $stateParams;
    }
})();