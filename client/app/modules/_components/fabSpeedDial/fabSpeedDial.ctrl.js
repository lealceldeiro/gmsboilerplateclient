/**
 * Created by Asiel on 2/10/2017.
 */

(function() {
    'use strict';

    angular.module('gmsBoilerplate')
        .controller('fabSpeedDial', function() {
            this.isOpen = false;
            this.selectedMode = 'md-fling';
            this.selectedDirection = 'left';
        });
})();