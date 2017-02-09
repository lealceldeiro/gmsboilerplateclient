/**
 * Created by Asiel on 11/10/2016.
 */

'use strict';

var humanReadable = function () {
    return function (data) {
        switch (data){
            case true:
                return 'Si';
            case false:
                return 'No';
        }
    }
};

humanReadable.$inject = [];

angular.module('rrms')
    .filter('humanReadable', humanReadable);