/**
 * Created by Asiel on 11/20/2016.
 */
(function () {

    'use strict';

    var f = function (sessionSrv, systemSrv, notificationSrv, $rootScope, BROADCAST, $location, ROUTE) {

        var FORBIDDEN = 403;

        function request(req) {
            var lan = sessionSrv.getLanguage();
            if (lan) {
                req.headers['Accept-Language'] = lan;
                req.headers['Content-Language'] = lan;
            }
            //AUTH
            var token = sessionSrv.securityToken();
            if (token) {
                //put custom header for sending the token along with request
                req.headers[systemSrv.header_auth_token_req] = (systemSrv.header_auth_bearer_req ?
                        systemSrv.header_auth_bearer_req + " " : "") + token;   //if bearer present, otherwise, put just token
            }
            else { //if not token found (user deleted it manually from browser's local storage), do logout
                sessionSrv.logOut();
                $location.path(ROUTE.LOGIN);
            }

            return req;
        }

        function responseError(rejection) {
            if(rejection.status === systemSrv.unauthorized_code_resp){
                if (sessionSrv.isLogged()) {
                    // do not show messages when a 401 for token expired occurred and user is logged in, since a new one is going to be retrieved
                    notificationSrv.mutedNotifications = true;
                    $rootScope.$broadcast(BROADCAST.auth.REFRESH_TOKEN);
                }
                else {
                    notificationSrv.showNotification(notificationSrv.type.ERROR, notificationSrv.utilText.unauthorized);
                    $rootScope.$broadcast(BROADCAST.auth.UNAUTHORIZED_BACKWARD);
                }

            }
            else if(rejection.status === FORBIDDEN){
                $rootScope.$broadcast(BROADCAST.auth.UNAUTHORIZED_BACKWARD);
            }
        }

        return {
            request: request,
            responseError: responseError
        };

    };

    var conf = function ($httpProvider) {
        $httpProvider['interceptors'].push('envValidityChecker');
    };

    angular
        .module('rrms')
        .factory('envValidityChecker', ['sessionSrv', 'systemSrv', 'notificationSrv', '$rootScope', 'BROADCAST',
            '$location', 'ROUTE', f])
        .config(['$httpProvider', conf]);


})();