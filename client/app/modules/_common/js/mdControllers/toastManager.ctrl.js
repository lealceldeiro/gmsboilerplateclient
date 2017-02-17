/**
 * Created by Asiel on 2/10/2017.
 */

(function() {
    'use strict';

    angular.module('rrms')
        .controller('toastManagerCtrl', ['$scope', '$mdToast', 'toastSrv', 'BROADCAST',

            function($scope, $mdToast, toastSrv, BROADCAST) {
                $scope.$on(BROADCAST.toast.OPEN, function () {
                    $scope.showCustomToast();
                });

                $scope.showCustomToast = function() {
                    $mdToast.show({
                        hideDelay   : 3000,
                        position    : 'bottom left',
                        controller  : 'ToastCtrl',
                        templateUrl : 'client/app/modules/../../../_common/html/toast/toast.tmpl.html'
                    });
                };
            }]);
})();