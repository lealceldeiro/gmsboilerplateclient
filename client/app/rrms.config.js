/**
 * Created by Asiel on 11/7/2016.
 */

(function() {

    'use strict';

    var runConfig = function ($rootScope, sessionSrv, navigationSrv, __env) {

        var prevRoute;

        $rootScope.$on('$routeChangeSuccess', function (a, b) {
            if (b && b.$$route && b.$$route.originalPath) {
                var route = b.$$route.originalPath;
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
                //in case configuration file is found and user try to access directly to error page,
                // redirect to default path
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

    var conf = function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('blue');
    };

    angular.module('rrms')
        .config(['$mdThemingProvider',conf])
        .run(['$rootScope', 'sessionSrv', 'navigationSrv', '__env', runConfig]);

})();