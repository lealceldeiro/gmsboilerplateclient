/**
 * Created by Asiel on 2/10/2017.
 */

(function() {
    'use strict';

    angular.module('rrms')
        .controller('dialogCtrl', ['$mdDialog', 'dialogSrv', '$scope', 'BROADCAST',

            function($mdDialog, dialogSrv, $scope, BROADCAST) {

            var type;

            $scope.$on(BROADCAST.modal.SHOW_DIALOG_TAB, function () {
                type = BROADCAST.modal.SHOW_DIALOG_TAB;
                showDialog();
            });
            $scope.$on(BROADCAST.modal.SHOW_DIALOG, function () {
                type = BROADCAST.modal.SHOW_DIALOG;
                showDialog();
            });

            function showDialog (title, tabsHeaders, tabsTitles, simpleDialogText, tabsContent, buttons, ev) {
                dialogSrv.title = title || dialogSrv.title;
                dialogSrv.tabsHeaders = tabsHeaders || dialogSrv.tabsHeaders;
                dialogSrv.tabsTitles = tabsTitles || dialogSrv.tabsTitles;
                dialogSrv.tabsContent = tabsContent || dialogSrv.tabsContent;
                dialogSrv.text = simpleDialogText || dialogSrv.text;
                dialogSrv.buttons = buttons ||  dialogSrv.buttons;
                dialogSrv.ev = ev || dialogSrv.ev;

                if (dialogSrv.title || dialogSrv.tabs || dialogSrv.tabsTitles || dialogSrv.tabsContent
                    || dialogSrv.buttons || dialogSrv.ev || dialogSrv.text) {
                    var template;
                    switch (type){
                        case BROADCAST.modal.SHOW_DIALOG_TAB:
                            template = "dialog_tab.tmpl.html";
                            break;
                        case BROADCAST.modal.SHOW_DIALOG:
                            template = "dialog_simple.tmpl.html";
                            break;
                    }

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '_components/dialog/' + template,
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

                $scope.title = dialogSrv.title;
                $scope.text = dialogSrv.text;
                $scope.tabsHeaders = dialogSrv.tabsHeaders;
                $scope.tabsTitles = dialogSrv.tabsTitles;
                $scope.simpleContent = dialogSrv.simpleContent;
                $scope.tabsContent = dialogSrv.tabsContent;
                $scope.buttons = dialogSrv.buttons;
                $scope.ev = dialogSrv.ev;

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