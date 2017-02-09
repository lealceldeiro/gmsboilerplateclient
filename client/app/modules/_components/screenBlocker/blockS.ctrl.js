/**
 * Created by Asiel on 1/10/2017.
 */

(
    function () {
        'use strict';

        var f = function ($scope, blockSrv) {
            var vm = this;

            vm.wizard = {
                blocked: false
            };

            $scope.$watch(
                function () {
                    return blockSrv.isBlocked();
                },
                function (newVal) {
                    vm.wizard.blocked = newVal
                }
            );

            return vm.wizard;
        };

        f.$inject = ['$scope', 'blockSrv'];

        angular.module('rrms')
            .controller('blockCtrl', f);
    }
)();