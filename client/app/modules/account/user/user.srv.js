/**
 * Created by Asiel on 22/12/2016.
 */

'use strict';

var f = function (systemSrv, $http, valueSrv, baseSrv) {
    var self = this;
    var url = systemSrv.APIAbsoluteUrl + 'user/';

    self.service = {
        sessionData:{},

        search: fnSearch,
        searchAll: fnSearchAll,
        show: fnShow,
        getByUsername: fnGetByUsername,
        remove: fnRemove,
        save: fnSave,
        activate: fnActivate,

        rolesByUserAndEntity: fnRolesByUserAndEntity,
        entitiesByUser: fnEntitiesByUser
    };

    return self.service;

    function fnSearch(eid, offset, max, criteria) {
        var params = baseSrv.getParams(offset, max, criteria);

        var def = $http.get(url + "entity/" + eid + "/" + params);
        return baseSrv.resolveDeferred(def);
    }

    function fnSearchAll(offset, max, criteria) {
        var params = baseSrv.getParams(offset, max, criteria);

        var def = $http.get(url + params);
        return baseSrv.resolveDeferred(def);
    }

    function fnRemove(id) {
        var def = $http.delete(url + id);
        return baseSrv.resolveDeferred(def);
    }

    function fnShow(id) {
        var def = $http.get(url + id);
        return baseSrv.resolveDeferred(def);
    }

    function fnGetByUsername(username) {
        var def = $http.get(url + "get/" + username);
        return baseSrv.resolveDeferred(def);
    }

    function fnSave(params, id) {
        var mUrl = url;

        if (typeof id !== 'undefined' && id != null && !isNaN(id)) {//update?
            mUrl = url + id ;
            var def = $http.post(mUrl, params);
        }
        else {//create?
            def = $http.put(mUrl, params);
        }

        return baseSrv.resolveDeferred(def);
    }

    function fnActivate(id, activate) {
        return baseSrv.resolveDeferred($http.post(url + id + "/activate/" + activate))
    }

    function fnRolesByUserAndEntity(id, eid, offset, max) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }

        var def = $http.get(url + id + "/" + eid + "/roles/" + params);
        return baseSrv.resolveDeferred(def);
    }

    function fnEntitiesByUser(id, offset, max) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }

        var def = $http.get(url + id + "/entities/" + params);
        return baseSrv.resolveDeferred(def);
    }
};

angular.module('rrms')
    .service('userSrv', ['systemSrv', '$http', 'valueSrv', 'baseSrv', f]);