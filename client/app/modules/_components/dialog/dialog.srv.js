/**
 * Created by Asiel on 11/6/2016.
 */

(function () {

    'use strict';

    angular.module('rrms')
        .service('dialogSrv', ['$rootScope', 'BROADCAST', function ($rootScope, BROADCAST) {
            var self = this;

            self.service = {
                showModal: false,
                setTitle: fnSetTitle,
                setTabs: fnSetTabs,
                setTabsContent: fnSetTabsContent,
                setSimpleContent: fnSetSimpleContent,
                setButtons: fnSetButtons,
                setEv: fnSetEv,
                setTabsTitles: fnSetTabsTitles
            };

            return self.service;

            //fn
            function fnSetTitle(title, showModal) {
                self.service.title = title;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }
            function fnSetTabs(tabs, showModal) {
                self.service.tabs = tabs;
                self.service.showModal = showModal;
            }
            function fnSetTabsTitles(tabsTitles, showModal) {
                self.service.tabsTitles = tabsTitles;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }
            function fnSetTabsContent(tabsContent, showModal) {
                self.service.tabsContent = tabsContent;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }
            function fnSetSimpleContent(content, showModal) {
                self.service.simpleContent = content;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG)
                }
            }
            function fnSetButtons(buttons, showModal) {
                self.service.buttons = buttons;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }
            function fnSetEv(ev, showModal) {
                self.service.ev = ev;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }
        }]);
})();