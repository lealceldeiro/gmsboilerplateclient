/**
 * Created by asiel on 15/05/17.
 */

(function () {
    'use strict';
    angular.module('gmsBoilerplate').controller('homeCtrl', [
        function () {
            var vm = this;

            vm.wizard = {
                init: fnInit
            };

            fnInit();

            return vm.wizard;

            //fn
            function fnInit() {
            }
        }
    ])
})();