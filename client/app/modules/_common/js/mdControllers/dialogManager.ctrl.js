/**
 * Created by Asiel on 2/10/2017.
 */

(function() {
    'use strict';

    angular.module('rrms')
        .controller('dialogManagerCtrl', ['$mdDialog', 'tabDialogSrv', '$scope', 'BROADCAST',

            function($mdDialog, tabDialogSrv, $scope, BROADCAST) {

            $scope.$on(BROADCAST.modal.SHOW_DIALOG_TAB, function () {
                showTabDialog();
            });

            function showTabDialog (title, tabs, tabsTitles, tabsContent, buttons, ev) {
                tabDialogSrv.title = title || tabDialogSrv.title;
                tabDialogSrv.tabs = tabs || tabDialogSrv.tabs;
                tabDialogSrv.tabsTitles = tabsTitles || tabDialogSrv.tabsTitles;
                tabDialogSrv.tabsContent = tabsContent || tabDialogSrv.tabsContent;
                tabDialogSrv.buttons = buttons ||  tabDialogSrv.buttons;
                tabDialogSrv.ev = ev || tabDialogSrv.ev;

                if (tabDialogSrv.title || tabDialogSrv.tabs || tabDialogSrv.tabsTitles || tabDialogSrv.tabsContent
                    || tabDialogSrv.buttons || tabDialogSrv.ev) {
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'client/app/modules/../../../_common/html/dialog/tabDialog.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function(answer) {
                            //something selected
                        }, function() {
                            //canceled
                        });
                }
                else{
                    console.warn('There was no data provided for dialog')
                }

            }

            function DialogController($scope, $mdDialog) {

                $scope.title = tabDialogSrv.title;
                $scope.tabs = tabDialogSrv.tabs;
                $scope.tabsTitles = tabDialogSrv.tabsTitles;
                $scope.tabsContent = tabDialogSrv.tabsContent;
                $scope.buttons = tabDialogSrv.buttons;
                $scope.ev = tabDialogSrv.ev;

                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }
        }]);
})();