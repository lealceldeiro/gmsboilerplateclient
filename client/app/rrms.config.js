/**
 * Created by Asiel on 11/7/2016.
 */

(function() {

    'use strict';

    var runConfig = function ($rootScope, sessionSrv, navigationSrv, __env, errorSrv, translatorSrv) {
        var prevRoute, params;


        var freeRoutes = [
            '/configuration-error',
            '/admin/login'
        ];

        $rootScope.$on('$routeChangeStart', function (event, next, data) {
            if (next && next.$$route && next.$$route.originalPath) {
                var route = next.$$route.originalPath;
                prevRoute = route;
                params = next.params;

                //security
                var found = false, pointer = freeRoutes.length - 1;
                while(!found && pointer >= 0) if(route.toString().indexOf(freeRoutes[pointer--]) !== -1) found = true;


                if (!found) { //protected route
                    if(!sessionSrv.isLogged()) {
                        sessionSrv.logOut(); //clean session data
                        event.preventDefault();
                        navigationSrv.goTo(navigationSrv.LOGIN_PATH);
                    }
                }
                //trying to access to login page after logged in?...redirect to main
                else if(route.toString().indexOf(navigationSrv.LOGIN_PATH) !== -1 && sessionSrv.isLogged()) event.preventDefault();

                //errors (config, browser...)
                if (!__env.supportHtml5 || !__env.varsFound) {
                    if (next.toString().indexOf(navigationSrv.CONFIG_ERROR_PATH) === -1) { //trying to access to a view when config is wrong
                        if(!__env.supportHtml5){
                            var titleKey = "config.error.browser_not_supported.title";
                            var msgKey = "config.error.browser_not_supported.message";
                        }
                        else {
                            errorSrv.title = "config.error.vars.title";
                            errorSrv.message = "config.error.vars.message";
                        }
                        event.preventDefault();
                        translatorSrv.setText(titleKey, errorSrv, "title");
                        translatorSrv.setText(msgKey, errorSrv, "message");
                        sessionSrv.logOut();
                        navigationSrv.goTo(navigationSrv.CONFIG_ERROR_PATH);
                    }
                }
                else if (route.toString().indexOf(navigationSrv.CONFIG_ERROR_PATH) !== -1) event.preventDefault();

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
                else { navigationSrv.goTo(prevRoute); }
            }
            else { navigationSrv.goTo(navigationSrv.DEFAULT_PATH); }
        });

    };

    var conf = function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('blue');
    };

    angular.module('rrms')
        .config(['$mdThemingProvider',conf])
        .run(['$rootScope', 'sessionSrv', 'navigationSrv', '__env', 'errorSrv', 'translatorSrv', runConfig]);

})();