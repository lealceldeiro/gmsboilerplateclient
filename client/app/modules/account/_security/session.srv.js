/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var sessionSrv = function (baseSrv, systemSrv, localStorageService) {
    var self = this;
    const lsPrefix = "gMS_localS_";

    const refreshTKey = lsPrefix + "RefreshToken";
    const tokenKey =  lsPrefix + "AuthToken";
    const currentUKey =  lsPrefix + "CurrentUsr";
    const permissionsKey =  lsPrefix + "uPermissions";
    const oEntityKey =  lsPrefix + "oCEntity";

    var sToken = null;
    var rToken = null;
    var currentUser = null;
    var permissions = null;
    var ownedEntity = null; //house, enterprise, business, or any other over which the user has control over

    var logged;

    self.service = {
        isLogged: fnIsLogged,

        securityToken: fnSecurityToken,
        setSecurityToken: fnSetSecurityToken,

        securityRefreshToken: fnSecurityRefreshToken,
        setSecurityRefreshToken: fnSetSecurityRefreshToken,

        currentUser: fnGetCurrentUser,
        setCurrentUser: fnSetCurrentUser,

        loginEntity: fnGetCurrentOwnedEntity,
        setCurrentOwnedEntity: fnSetCurrentOwnedEntity,

        setPermissions: fnSetPermissions,
        getPermissions: fnGetPermissions,

        clearSession: fnClearSession


    };

    return self.service;

    function fnIsLogged() {
        if (logged === false) {
            return false;
        }
        else if(logged === true){
            return true;
        }
        else{
            sToken = localStorageService.get(tokenKey);
            logged = (typeof sToken !== 'undefined' && sToken !== null);
            return logged
        }
    }


    function fnSecurityToken() {
        if (!sToken) {
            sToken = localStorageService.get(tokenKey);
        }
        else{
            if (!localStorageService.get(tokenKey)) {
                fnSetSecurityToken(sToken)
            }
        }
        return sToken;
    }

    function fnSetSecurityToken(token) {
        sToken = token;
        localStorageService.set(tokenKey, sToken);
        logged = true;
    }

    function fnClearSession() {
        logged = false;
        localStorageService.remove(tokenKey);
        localStorageService.remove(refreshTKey);
        localStorageService.remove(currentUKey);
        localStorageService.remove(permissionsKey);
        localStorageService.remove(oEntityKey);

        sToken = null;
        rToken = null;
        currentUser = null;
        permissions = null;
        ownedEntity = null;
    }


    function fnSecurityRefreshToken() {
        if (!rToken) {
            rToken = localStorageService.get(refreshTKey);
        }
        else {
            if (!localStorageService.get(refreshTKey)) {
                fnSetSecurityRefreshToken(rToken);
            }
        }

        return rToken;
    }

    function fnSetSecurityRefreshToken(refreshToken) {
        rToken = refreshToken;
        localStorageService.set(refreshTKey, rToken);
    }


    function fnSetCurrentUser(u) {
        currentUser = u;
        localStorageService.set(currentUKey, currentUser);
    }

    function fnGetCurrentUser() {
        if (!currentUser) {
            currentUser = localStorageService.get(currentUKey);
        }
        else{
            if(!localStorageService.get(currentUKey)){
                fnSetCurrentUser(currentUser)
            }
        }
        return currentUser;
    }


    function fnSetCurrentOwnedEntity(e) {
        ownedEntity = e;
        localStorageService.set(oEntityKey, ownedEntity);
    }

    function fnGetCurrentOwnedEntity() {
        if (!ownedEntity) {
            ownedEntity = localStorageService.get(oEntityKey);
        }
        else{
            if(!localStorageService.get(oEntityKey)){
                fnSetCurrentOwnedEntity(ownedEntity)
            }
        }
        return ownedEntity;
    }


    function fnSetPermissions(uPermissions) {
        permissions = uPermissions;
        localStorageService.set(permissionsKey, permissions);
    }

    function fnGetPermissions() {
        if (!permissions) {
            permissions = localStorageService.get(permissionsKey);
        }
        else{
            if(!localStorageService.get(permissionsKey)){
                fnSetPermissions(permissions)
            }
        }
        return permissions;
    }

};

sessionSrv.$inject = ['baseSrv', 'systemSrv', 'localStorageService'];

angular.module('rrms')
    .service('sessionSrv', sessionSrv);