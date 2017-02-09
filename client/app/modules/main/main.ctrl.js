/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var mainCtrl = function (indexSrv) {
        var vm = this;

        vm.wizard = {
            init: fnInit
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Main'
        }

    };

    mainCtrl.$inject = ['indexSrv'];

    angular.module('rrms')
        .controller('mainCtrl', mainCtrl);

})();