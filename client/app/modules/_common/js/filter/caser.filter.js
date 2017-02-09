/**
 * Created by Asiel on 01/20/2017.
 */

'use strict';

var f = function () {
    return function (data) {
        if (data) {
            data = data.toString();
            var s = data.split(" ");
            var r = "", l, a;
            angular.forEach(s, function (word) {
                l = word.toString().toLocaleLowerCase();
                a = l.charAt(0).toUpperCase();
                l = a + l.slice(1);
                r += l + " ";
            });
            return r;
        }
    };
};

f.$inject = [];

angular.module('rrms')
    .filter('caser', f);