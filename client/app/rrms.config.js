/**
 * Created by Asiel on 11/7/2016.
 */

(function() {

    'use strict';

    var runConfig = function ($rootScope, sessionSrv, navigationSrv, __env, errorSrv) {

        var prevRoute, params;

        $rootScope.$on('$routeChangeStart', function (event, next, data) {
            if (!__env.supportHtml5 || !__env.varsFound) {
                if (next && next.$$route && navigationSrv.CONFIG_ERROR_PATH !== next.$$route.originalPath) {
                    event.preventDefault();
                    if(!__env.supportHtml5){
                        errorSrv.title = "Navegador no soportado";
                        errorSrv.message = "Usted posse un navegador que no soporta nuestra tecnología. Por favor, actualice a un navegador más moderno."
                    }
                    else {
                        errorSrv.title = "Error en la configuración del sistema";
                        errorSrv.message = "Existe un error en la configuración del sistema y no se puede acceder al mismo. Contacte con el administrador."
                    }
                    sessionSrv.logOut();
                    navigationSrv.goTo(navigationSrv.CONFIG_ERROR_PATH);
                }
            }
        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, data) {
            if (current && current.$$route && current.$$route.originalPath) {
                var route = current.$$route.originalPath;
                prevRoute = route;
                params = current.params;

                /****************************AUTHENTICATION CHECK******************************************************/
                //routes excluded from login check
                if (route !== navigationSrv.LOGIN_PATH && route !== navigationSrv.CONFIG_ERROR_PATH) {
                    //not using "ROUTE.LOGIN" AND 'ROUTE.CONFIG_ERROR" because they might not be defined at this point
                    if (!sessionSrv.isLogged()) {
                        navigationSrv.goTo(navigationSrv.LOGIN_PATH);
                    }
                }
                //in case user is already logged, redirect to default path
                else if (route === navigationSrv.LOGIN_PATH){
                    prevRoute = null;
                    if (sessionSrv.isLogged()) {
                        navigationSrv.goTo(navigationSrv.DEFAULT_PATH);
                    }
                }
                //in case configuration file is found and user try to access directly to error page,
                // redirect to default path
                else if (route === navigationSrv.CONFIG_ERROR_PATH && __env && __env.varsFound){
                    navigationSrv.goTo(navigationSrv.DEFAULT_PATH);
                }
            }
        });

        //triggered when a new token was retrieved since the old one expired, so we need to refresh the last requested
        //view, since it wasn't resolved due to the forbidden backend response
        $rootScope.$on('UNAUTHORIZED_BACKWARD', function () {
            if (prevRoute) {
                if (params && typeof params['id']  !== 'undefined' && params['id'] !== null
                    && prevRoute.indexOf(':id') !== -1) {
                    navigationSrv.goTo(prevRoute, ':id', params['id']);
                }
                else {
                    navigationSrv.goTo(prevRoute);
                }
            }
            else {
                navigationSrv.goTo(navigationSrv.DEFAULT_PATH);
            }
        });

    };

    var conf = function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('blue');
    };

    angular.module('rrms')
        .config(['$mdThemingProvider',conf])
        .run(['$rootScope', 'sessionSrv', 'navigationSrv', '__env', 'errorSrv', runConfig]);

})();