/**
 * Created by Asiel on 2/10/2017.
 */

(function() {
    'use strict';

    var isDlgOpen;

    angular.module('rrms')
        .controller('ToastCtrl', ['$scope', '$mdToast', 'toastSrv',

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