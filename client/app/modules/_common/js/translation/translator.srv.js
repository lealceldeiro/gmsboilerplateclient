/**
 * Created by asiel on 9/05/17.
 */

(function () {
    'use strict';

    angular.module('rrms').service('translatorSrv', ['$translate',

        function ($translate) {
            var self = this;

            self.service = {
                setText: fnSetText
            };

            return self.service;

            //fn
            function fnSetText(i18nKey, objectWithText, textVarKey, interpolationObject) {
                return $translate(i18nKey, interpolationObject).then(
                    function (text) {
                        objectWithText[textVarKey] = text;
                    },
                    function (textId) {
                        objectWithText[textVarKey] = textId;
                    }
                )
            }
        }])
})();