/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var indexSrv = function () {
    var vm = this;


    vm.service = {
        siteTile: ''
    };

    return vm.service;
};

indexSrv.$inject = [];

angular.module('rrms')
    .service('indexSrv', indexSrv);