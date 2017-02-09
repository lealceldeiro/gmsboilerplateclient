/**
 * Created by Asiel on 01/24/2016.
 */

'use strict';

var f = function (systemSrv, $http, valueSrv, baseSrv) {
    var self = this;
    var url = systemSrv.APIAbsoluteUrl + 'entity/';

    self.service = {
        search: fnSearch,
        show: fnShow,
        remove: fnRemove,
        save: fnSave,

        usersByEntity: fnUsersByEntity
    };

    return self.service;

    /**
     * Search for owned entities
     * @param uid Logged user id
     * @param offset offset for paging
     * @param max max offset for paging
     * @param criteria criteria for searching
     * @returns {*} Promise
     */
    function fnSearch(uid, offset, max, criteria) {
        var params = baseSrv.getParams(offset, max, criteria);

        var def =  $http.get(url + "user/" + uid + "/" + params);
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

    function fnSave(params, id, uid) {
        var mUrl = url;

        if (typeof id !== 'undefined' && id != null && !isNaN(id)) {//update?
            mUrl = url + id ;
            var def = $http.post(mUrl, params);
        }
        else if(typeof uid !== 'undefined' && uid != null && !isNaN(uid)){//create?
            mUrl = url + uid ;
            def = $http.put(mUrl, params);
        }
        return baseSrv.resolveDeferred(def);
    }

    function fnUsersByEntity(id, offset, max) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }

        var def = $http.get(url + id + '/users/' + params);
        return baseSrv.resolveDeferred(def);
    }
};

f.$inject = ['systemSrv', '$http', 'valueSrv', 'baseSrv'];

angular.module('rrms')
    .service('ownedEntitySrv', f);