/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var indexCtrl = function ($scope, indexSrv, sessionSrv) {
        var vm = this;

        vm.wizard = {
            init: fnInit,

            siteTitle: fnSiteTitle
        };

        $scope.$watch(function () {return vm.wizard.siteTitle();},function (nVal, oVal) {});

        //update users's logged in/out status
        $scope.$on('TRIGGER_ACTION_AUTH', function () {
            vm.wizard.logged = sessionSrv.isLogged();
        });

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Index';
            vm.wizard.logged = sessionSrv.isLogged();
        }

        function fnSiteTitle() {
            return indexSrv.siteTile;
        }

    };

    indexCtrl.$inject = ['$scope', 'indexSrv', 'sessionSrv'];

    angular.module('rrms')
        .controller('indexCtrl', indexCtrl);

})();