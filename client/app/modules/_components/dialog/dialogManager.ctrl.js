/**
 * Created by Asiel on 2/10/2017.
 */

(function() {
    'use strict';

    angular.module('rrms')
        .controller('dialogManagerCtrl', ['$mdDialog', 'dialogSrv', '$scope', 'BROADCAST',

            function($mdDialog, dialogSrv, $scope, BROADCAST) {

            var type;

            $scope.$on(BROADCAST.modal.SHOW_DIALOG_TAB, function () {
                type = BROADCAST.modal.SHOW_DIALOG_TAB;
                showDialog();
            });

            function showDialog (title, tabs, tabsTitles, tabsContent, buttons, ev) {
                dialogSrv.title = title || dialogSrv.title;
                dialogSrv.tabs = tabs || dialogSrv.tabs;
                dialogSrv.tabsTitles = tabsTitles || dialogSrv.tabsTitles;
                dialogSrv.tabsContent = tabsContent || dialogSrv.tabsContent;
                dialogSrv.simpleContent = tabsContent || dialogSrv.simpleContent;
                dialogSrv.buttons = buttons ||  dialogSrv.buttons;
                dialogSrv.ev = ev || dialogSrv.ev;

                if (dialogSrv.title || dialogSrv.tabs || dialogSrv.tabsTitles || dialogSrv.tabsContent
                    || dialogSrv.buttons || dialogSrv.ev) {
                    var template;
                    switch (type){
                        case BROADCAST.modal.SHOW_DIALOG_TAB:
                            template = "tabDialog.tmpl.html";
                            break;
                        case BROADCAST.modal.SHOW_DIALOG:
                            template = "simpleDialog.tmpl.html";
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
                $scope.tabs = dialogSrv.tabs;
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