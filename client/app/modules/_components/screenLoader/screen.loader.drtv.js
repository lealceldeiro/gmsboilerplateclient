/**
 * Created by Asiel on 1/10/2017.
 */

'use strict';

var f = function () {
    return {
        templateUrl: '_components/screenLoader/screen.loader.tpl.html',
        transclude: true,
        restrict: 'EAC',
        scope: {screenType: '@'}
    }
};

f.$inject = [];

angular.module('rrms')
    .directive('rrmsScreenLoader', f);