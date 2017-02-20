/**
 * Created by Asiel on 11/20/2016.
 */

'use strict';

var f = function (__env, $location, ROUTE, sessionSrv, systemSrv, notificationSrv, $rootScope, BROADCAST) {

    var FORBIDDEN = 403;

    function request(req) {
        //VALIDITY OF CONFIGURATIONS
        if (!__env.varsFound) { //vars file not found
            sessionSrv.clearSession(); //logout in case file is deleted or nor found
            $location.path(ROUTE.CONFIG_ERROR);
        }

        //AUTH
        var token = sessionSrv.securityToken();
        if (token) {
            //put custom header for sending the token along with request
            req.headers[systemSrv.header_auth_token_req] = (systemSrv.header_auth_bearer_req ?
                systemSrv.header_auth_bearer_req + " " : "") + token;   //if bearer present, otherwise, put just token
        }

        return req;
    }

    function responseError(rejection) {
        if(rejection.status === systemSrv.unauthorized_code_resp){
            if (sessionSrv.isLogged()) {
                $rootScope.$broadcast(BROADCAST.auth.REFRESH_TOKEN);
            }
            else {
                notificationSrv.showNotification(notificationSrv.utilText.unauthorized.es);
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

f.$inject = ['__env', '$location', 'ROUTE', 'sessionSrv', 'systemSrv', 'notificationSrv', '$rootScope', 'BROADCAST'];
conf.$inject = ['$httpProvider'];

angular
    .module('rrms')
    .factory('envValidityChecker', f)
    .config(['$httpProvider', conf]);