/**
 * Created by Asiel on 11/6/2016.
 */

(function () {

    'use strict';

    angular.module('rrms')
        .service('dialogSrv', ['$rootScope', 'BROADCAST', function ($rootScope, BROADCAST) {
            var self = this;

            self.service = {
                data: {},
                showTabDialog: fnShowTabDialog,
                showDialog: fnShowSimpleDialog
            };

            return self.service;

            //fn
            /**
             * Sets a tabbed modal components and shows it
             * @param title modal title
             * @param tabsHeaders modal tabs titles
             * @param tabsTitles header for each tab content
             * @param tabsContent Content of each tab of the modal
             * @param buttons Buttons of the modal
             * @param ev Event which fired the modal
             */
            function fnShowTabDialog(title, tabsTitles, tabsContent, tabsHeaders, buttons, ev) {
                self.service.title = title;
                self.service.tabsHeaders = tabsHeaders;
                self.service.tabsTitles = tabsTitles;
                self.service.tabsContent = tabsContent;
                self.service.buttons = buttons;
                self.service.ev = ev;
                $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
            }

            /**
             * Sets a simple modal components and shows it
             * @param title modal title
             * @param text Content of the modal
             * @param buttons Buttons of the modal
             * @param ev Event which fired the modal
             */
            function fnShowSimpleDialog(title, text, buttons, ev) {
                self.service.title = title;
                self.service.text = text;
                self.service.buttons = buttons;
                self.service.ev = ev;
                $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG);
            }
        }]);
})();