/**
 * Created by Asiel on 11/6/2016.
 */

(function () {

    'use strict';

    angular.module('rrms')
        .service('dialogSrv', ['$rootScope', 'BROADCAST', function ($rootScope, BROADCAST) {
            var self = this;

            self.service = {
                setTitle: fnSetTitle,
                setTabs: fnSetTabs,
                setTabsContent: fnSetTabsContent,
                setButtons: fnSetButtons,
                setEv: fnSetEv,
                setTabsTitles: fnSetTabsTitles,

                showTabDialog: fnShowTabDialog,
                showDialog: fnShowSimpleDialog
            };

            return self.service;

            //fn
            /**
             * Sets a tabbed modal components and shows it
             * @param title modal title
             * @param tabs modal tabs titles
             * @param tabsTitles header for each tab content
             * @param tabsContent Content of each tab of the modal
             * @param buttons Buttons of the modal
             * @param ev Event which fired the modal
             */
            function fnShowTabDialog(title, tabs, tabsTitles, tabsContent, buttons, ev) {
                self.service.title = title;
                self.service.tabs = tabs;
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



            /**
             * Sets a tabbed modal title and shows it
             * @param title modal title
             * @param showModal Show modal or not
             */
            function fnSetTitle(title, showModal) {
                self.service.title = title;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }

            /**
             * Sets a tabbed modal tabs and shows it
             * @param tabs modal tabs titles
             * @param showModal Show modal or not
             */
            function fnSetTabs(tabs, showModal) {
                self.service.tabs = tabs;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }

            /**
             * Sets a tabbed modal tabsTitles and shows it
             * @param tabsTitles header for each tab content
             * @param showModal Show modal or not
             */
            function fnSetTabsTitles(tabsTitles, showModal) {
                self.service.tabsTitles = tabsTitles;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }

            /**
             * Sets a tabbed modal tabsContent and shows it
             * @param tabsContent Content of each tab of the modal
             * @param showModal Show modal or not
             */
            function fnSetTabsContent(tabsContent, showModal) {
                self.service.tabsContent = tabsContent;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }

            /**
             * Sets a tabbed modal buttons and shows it
             * @param buttons Buttons of the modal
             * @param showModal Show modal or not
             */
            function fnSetButtons(buttons, showModal) {
                self.service.buttons = buttons;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }

            /**
             * Sets a tabbed modal ev and shows it
             * @param ev Event which fired the modal
             * @param showModal Show modal or not
             */
            function fnSetEv(ev, showModal) {
                self.service.ev = ev;
                if (showModal) {
                    $rootScope.$broadcast(BROADCAST.modal.SHOW_DIALOG_TAB)
                }
            }
        }]);
})();