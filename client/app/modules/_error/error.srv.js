/**
 * Created by asiel on 1/05/17.
 */
(function () {
    'use strict';
    angular.module('gmsBoilerplate').service('errorSrv', [function () {
        var self = this;

        self.service = {
            title: null,
            message: null
        };

        return self.service;

        //
    }])
})();