/**
 * Created by Asiel on 2/10/2017.
 */

(function() {
    'use strict';

    angular.module('rrms')
        .controller('toolBarCtrl', ['$scope', 'BROADCAST', 'toolBarSrv',

            function($scope, BROADCAST, toolBarSrv) {
            var self  = this;

            self.wizard = {
                buttonsArr: [],
                show : false,
                isOpen: false,
                direction: 'left',
                doAction: fnDoAction
            };

            $scope.$on(BROADCAST.component.toolbar.show, function () {
                self.wizard.buttonsArr = toolBarSrv.buttonsArr;
                self.show = true;
            });
            $scope.$on(BROADCAST.component.toolbar.hide, function () {
                self.show = false;
            });

            return self.wizard;

            function fnDoAction(idx) {
                return toolBarSrv.doAction(idx);
            }
        }]);
})();