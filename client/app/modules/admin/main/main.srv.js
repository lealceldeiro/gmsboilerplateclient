/**
 * Created by Asiel on 11/6/2016.
 */

(function () {

    'use strict';

    var mainSrv = function () {
        var vm = this;


        vm.service = {
        };

        return vm.service;
    };

    angular.module('gmsBoilerplate')
        .service('mainSrv', mainSrv);

}());