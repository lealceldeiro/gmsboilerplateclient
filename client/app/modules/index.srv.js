/**
 * Created by Asiel on 11/6/2016.
 */

(function() {

    'use strict';

    var indexSrv = function () {
        var vm = this;


        vm.service = {
            siteTile: ''
        };

        return vm.service;
    };

    angular.module('gmsBoilerplate')
        .service('indexSrv', indexSrv);

}());