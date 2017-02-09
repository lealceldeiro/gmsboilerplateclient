/**
 * Created by Asiel on 11/11/2016.
 */

'use strict';

(function () {

    var notificationCtrl = function (notificationSrv) {
        var vm = this;

        vm.wizard = {
            init: fnInit,
            clear: fnClear,
            getNotificationHtml: getNotificationHtml,
            executeCallBack: fnExecuteCallBack
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
        }

        function getNotificationHtml() {
            return notificationSrv.htmlContent;
        }

        function fnClear() {
            notificationSrv.htmlContent = null;
        }

        function fnExecuteCallBack() {
            notificationSrv.executeCallBack()
        }

    };

    notificationCtrl.$inject = ['notificationSrv'];

    angular.module('rrms')
        .controller('notificationCtrl', notificationCtrl);

})();