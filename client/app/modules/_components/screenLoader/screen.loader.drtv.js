/**
 * Created by Asiel on 1/10/2017.
 */

(function(){

'use strict';

var f = function () {
    return {
        templateUrl: 'client/app/modules/_components/screenLoader/screen.loader.tpl.html',
        transclude: true,
        restrict: 'EAC',
        scope: {screenType: '@'}
    }
};

angular.module('gmsBoilerplate')
    .directive('rrmsScreenLoader', f);
})();