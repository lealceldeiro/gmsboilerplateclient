/**
 * Created by Asiel on 11/6/2016.
 */

(function(){

'use strict';

var navigationSrv = function ($location, $route, ROUTE, $window, stringSrv) {
    var vm = this;


    vm.service = {
        DEFAULT_PATH: ROUTE.MAIN,
        LOGIN_PATH: ROUTE.LOGIN,
        CONFIG_ERROR_PATH: ROUTE.CONFIG_ERROR,

        goTo: fnGoTo,
        back: fnBack,

        currentPath: fnCurrentPath,
        currentParams: fnCurrentParams
    };

    return vm.service;

    function fnGoTo(link, placeholders, params) {
        if (placeholders && params) {
            if (angular.isArray(placeholders) && angular.isArray(params)) {
                if (placeholders.length != params.length) {
                    throw new Error('Placeholders and params must be of equal length');
                }
                angular.forEach(placeholders, function (obj, idx) {
                    link = stringSrv.replaceAll(link, obj, params[idx])
                })
            }
            else{
                link = stringSrv.replaceAll(link, placeholders, params);
            }
        }
        if (link){
            if ($location.path() === link){
                $route.reload();
            }else{
                $location.path(link);
            }
        }
    }


    function fnCurrentPath() {
        return $location.path();
    }

    function fnCurrentParams() {
        return $route && $route.current ? $route.current.params : null;
    }

    function fnBack() {
        $window.history.back();
    }

};

navigationSrv.$inject = ['$location', '$route', 'ROUTE', '$window', 'stringSrv'];

angular.module('rrms')
    .service('navigationSrv', navigationSrv);

})();