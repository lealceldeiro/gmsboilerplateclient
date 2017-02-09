/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var mainSrv = function () {
    var vm = this;


    vm.service = {
    };

    return vm.service;
};

mainSrv.$inject = [];

angular.module('rrms')
    .service('mainSrv', mainSrv);