/**
 * Created by Asiel on 11/10/2016.
 */
(function(){

'use strict';

var humanReadable = function () {
    return function (data, prefix, postfix) {
        switch (data){
            case true:
                return prefix + 'Activo' + postfix;
            case false:
                return prefix + 'Inactivo' + postfix;
        }
    }
};

humanReadable.$inject = [];

angular.module('rrms')
    .filter('humanReadable', humanReadable);
})();