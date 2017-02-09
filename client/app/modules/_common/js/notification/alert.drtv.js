/**
 * Created by Asiel on 12/26/2016.
 */

'use strict';

(function () {

    var f = function () {
        return {
            restrict: 'AC', // E = Element, A = Attribute, C = Class
            replace: true,
            template:
                '<div class="alert alert-{{ type }} col-md-12 text-center notification" role="alert">' +
                '   <button type="button" class="close" data-dismiss="alert">' +
                '       <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>' +
                '   </button>' +
                '   <strong>{{ message }}</strong>' +
                '</div>'
            ,
            scope: {
                type: '@',
                message: '@',
                dismiss: '@' //todo: when dismiss false, do not show dismiss button
            }
        };
    };

    f.$inject = [];

    angular.module('rrms')
        .directive('rrmsAlert', f);
}());