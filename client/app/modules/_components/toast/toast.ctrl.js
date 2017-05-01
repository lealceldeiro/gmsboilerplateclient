/**
 * Created by Asiel on 2/10/2017.
 */

(function() {
    'use strict';


    var isDlgOpen;

    angular.module('rrms')
        .controller('toastCtrl', ['$scope', '$mdToast', 'toastSrv', 'BROADCAST',

            function($scope, $mdToast, toastSrv, BROADCAST) {
                $scope.$on(BROADCAST.component.toast.OPEN, function () {
                    $scope.showCustomToast();
                });

                $scope.showCustomToast = function() {
                    $mdToast.show({
                        hideDelay   : 3000,
                        position    : 'bottom left',
                        controller  : 'toastManagerCtrl',
                        templateUrl : 'client/app/modules/_components/toast/toast.tmpl.html'
                    });
                };
            }])
        .controller('toastManagerCtrl', ['$scope', '$mdToast', 'toastSrv',

            function($scope, $mdToast, toastSrv) {
                $scope.closeToast = function() {

                    if (isDlgOpen) return;

                    $mdToast
                        .hide()
                        .then(function() {
                            isDlgOpen = false;
                        });
                };

                $scope.buttons = toastSrv.buttons;

                $scope.text = toastSrv.text;
            }]);
})();