/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var loginSrv = function ($http, systemSrv, baseSrv, sessionSrv, $rootScope) {
    var vm = this;

    var url = systemSrv.APIAbsoluteUrl;
    var userVar = systemSrv.auth_login_user_req;
    var passVar = systemSrv.auth_login_password_req;

    vm.service = {
        siteTile: '',

        login: fnDoLogin,
        logout: fnDoLogout,

        getLoginEntity: fnGetLoginEntity
    };

    $rootScope.$on('REFRESH_TOKEN', function () {
        _doRefreshToken().then(
            function (data) {
                var e = systemSrv.evalAuth(data, false, false);
                if (e) {
                    sessionSrv.setSecurityToken(systemSrv.getAuthToken());
                    sessionSrv.setSecurityRefreshToken(systemSrv.getAuthRefreshToken());
                    $rootScope.$broadcast('UNAUTHORIZED_BACKWARD');
                }
            }
        )
    });

    return vm.service;


    function fnDoLogin(username, password) {
        var data = {};
        data[userVar] = username;
        data[passVar] = password;
        return baseSrv.resolveDeferred($http.post(url + "login", data));
    }

    function _doRefreshToken() {
        var req = {
            method: 'POST',
            url: systemSrv.base_url_req + '/oauth/access_token?' + systemSrv.auth_new_token_requester_req + "=" +
            systemSrv.item_refresh_token_req_resp + "&" + systemSrv.item_refresh_token_req_resp + "=" + sessionSrv.securityRefreshToken(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        var def = $http(req);
        return baseSrv.resolveDeferred(def);
    }

    function fnDoLogout() {
        var h = {};
        h[systemSrv.header_un_auth_token_req] = sessionSrv.securityToken();
        var req = {
            method: 'GET',
            url: url + "logout",
            headers: h
        };
        return baseSrv.resolveDeferred($http(req));
    }

    function fnGetLoginEntity() {
        var def = $http.get(url + "config/entity/last");
        return baseSrv.resolveDeferred(def);
    }

};

loginSrv.$inject = ['$http', 'systemSrv', 'baseSrv', 'sessionSrv', '$rootScope'];

angular.module('rrms')
    .service('loginSrv', loginSrv);