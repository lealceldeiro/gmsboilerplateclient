/**
 * Created by Asiel on 11/7/2016.
 */

'use strict';

(function() {

    var runConfig = function ($rootScope, sessionSrv, navigationSrv, __env) {

        var prevRoute;

        $rootScope.$on('$routeChangeSuccess', function (a, b) {
            if (b && b.$$route && b.$$route.originalPath) {
                var route = b.$$route.originalPath;

                /******************************VISUAL ELEMENTS HANDLING************************************************/
                    //add and remove class to active links (nav bars,menus...)
                var s, p;
                if (prevRoute) {
                    s = prevRoute.substring(1, prevRoute.length);
                    p = s.indexOf('/'); //path
                    if (p > 0) {
                        s = s.substring(0, p);  //take only the first part of the path, i.e.: from "role/3/show/", just take "role"
                    }
                    angular.element(document.querySelectorAll('.' + s)).removeClass('active');  //remove class from all of the previous route
                }
                s = route.substring(1, route.length);
                p = s.indexOf('/');
                if (p > 0) {
                    s = s.substring(0, p);
                }
                angular.element(document.querySelectorAll('.' + s)).addClass('active');        //add class from to of the new route
                prevRoute = route;

                /****************************AUTHENTICATION CHECK******************************************************/
                //routes excluded from login check
                if (route !== '/login' && route !== '/configuration-error') {
                    //not using "ROUTE.LOGIN" AND 'ROUTE.CONFIG_ERROR" because they might not be defined at this point
                    if (!sessionSrv.isLogged()) {
                        navigationSrv.goTo(navigationSrv.LOGIN_PATH);
                    }
                }
                //in case user is already logged, redirect to default path
                else if (route === '/login'){
                    prevRoute = null;
                    if (sessionSrv.isLogged()) {
                        navigationSrv.goTo(navigationSrv.DEFAULT_PATH);
                    }
                }
                //in case configuration file is found and user try to access directly yo error page, redirect to default path
                else if (route === '/configuration-error' && __env && __env.varsFound){
                    navigationSrv.goTo(navigationSrv.DEFAULT_PATH);
                }
            }
        });

        //triggered when a new token was retrieved since the old one expired, so we need to refresh the last requested
        //view, since it wasn't resolved due to the forbidden backend response
        $rootScope.$on('UNAUTHORIZED_BACKWARD', function () {
            navigationSrv.goTo(navigationSrv.DEFAULT_PATH);
        });

    };

    runConfig.$inject = ['$rootScope', 'sessionSrv', 'navigationSrv', '__env'];

    angular.module('rrms')
        .run(['$rootScope', 'sessionSrv', 'navigationSrv', '__env', runConfig]);

})();