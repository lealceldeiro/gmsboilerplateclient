/**
 * Created by asiel on 1/05/17.
 */

(function () {
    'use strict';

    angular.module('rrms').service('configSrv', ['baseSrv', '$http', 'systemSrv', 'sessionSrv',

        function (baseSrv, $http, systemSrv, sessionSrv) {
            var self = this;

            var url = systemSrv.APIAbsoluteUrl;

            self.service = {
                config:{},

                loadConfig: fnLoadConfig,
                save: fnSave,

                changeLanguage: fnChangeLanguage
            };

            return self.service;

            //
            function fnLoadConfig() {
                return baseSrv.resolveDeferred($http.get(url + 'config'));
            }

            function fnSave(params, uid) {
                return baseSrv.resolveDeferred($http.post(url + 'config', params));
            }

            function fnChangeLanguage(lan) {
                sessionSrv.setLanguage(lan);
            }
        }
    ])
})();