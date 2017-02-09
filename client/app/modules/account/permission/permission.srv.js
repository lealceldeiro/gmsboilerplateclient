/**
 * Created by Asiel on 1/20/2017.
 */

(
    function () {
        'use strict';
        
        var f = function (baseSrv, systemSrv, $http) {
            var self = this;
            var url = systemSrv.APIAbsoluteUrl + 'permission/';
            
            self.service = {
                search: fnSearch
            };

            return self.service;
            
            //fn
            function fnSearch(offset, max, criteria) {
                var params = baseSrv.getParams(offset, max, criteria);

                var def =  $http.get(url + params);
                return baseSrv.resolveDeferred(def);
            }
                
        };
        
        f.$inject = ['baseSrv', 'systemSrv', '$http'];
        
        angular.module('rrms')
            .service('permissionSrv', f)
    }
)();