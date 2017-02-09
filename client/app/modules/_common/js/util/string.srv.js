/**
 * Created by Asiel on 12/11/2016.
 */
(
    function () {
        'use strict';

        var stringSrv = function () {
            var self = this;

            self.service = {
                replaceAll: fnReplaceAll
            };

            return self.service;

            function fnReplaceAll (string, target, val){
                if (target == val) {
                    throw new Error('An infinite loop will be executed since target \'' + target + '\' and val \'' + val
                        + '\' are the same.');
                }
                var idx = string.indexOf(target);
                while(idx !== -1){
                    string = string.replace(target, val);
                    idx = string.indexOf(target);
                }
                return string;
            }
        };

        stringSrv.$inject = [];

        angular.module('rrms')
            .service('stringSrv', stringSrv);
    }
)();