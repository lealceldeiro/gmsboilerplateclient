/**
 * Created by Asiel on 11/6/2016.
 */

(function () {

    'use strict';

    angular.module('rrms')
        .service('toastSrv', ['$rootScope', 'BROADCAST', function ($rootScope, BROADCAST) {
            var self = this;

            self.service = {
                buttons: [],
                text: null,

                show: fnShowToast
            };

            return self.service;

            //fn

            function fnShowToast(text, buttons) {
                var show = false;
                if (angular.isDefined(text)) {
                    self.service.text = text;
                    show = true;
                }
                if (angular.isDefined(buttons) && angular.isArray(buttons)) {
                    self.service.buttons = buttons;
                    show = true;
                }
                if (show) {
                    $rootScope.$broadcast(BROADCAST.toast.OPEN);
                }
            }
        }]);
})();