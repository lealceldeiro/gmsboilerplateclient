/**
 * Created by Asiel on 11/6/2016.
 */

(function () {

    'use strict';

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

    angular.module('gmsBoilerplate')
        .controller('mainCtrl', ['indexSrv', mainCtrl]);

})();