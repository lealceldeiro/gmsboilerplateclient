/**
 * Created by asiel on 1/05/17.
 */

(function () {
    'use strict';

    angular.module('rrms').service('configSrv', ['baseSrv', '$http', 'systemSrv',

        function (baseSrv, $http, systemSrv) {
            var self = this;

            var url = systemSrv.APIAbsoluteUrl;

            self.service = {
                config:{},

                loadConfig: fnLoadConfig,
                save: fnSave
            };

            return self.service;

            //
            function fnLoadConfig() {
                return baseSrv.resolveDeferred($http.get(url + 'config'));
            }

            function fnSave(params, uid) {
                return baseSrv.resolveDeferred($http.post(url + 'config', params));
            }
        }
    ])
})();