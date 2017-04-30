/**
 * Created by Asiel on 01/20/2017.
 */
(function(){

'use strict';

var f = function () {
    return function (data) {
        if (data) {
            data = data.toString();
            var s = data.split("   ");
            if (s.length === 0) {
                s = data.split("  ");
            }
            if (s.length === 0) {
                s = data.split(" ");
            }
            var r = "", l, a;
            angular.forEach(s, function (word) {
                l = word.toString().toLocaleLowerCase();
                a = l.charAt(0).toUpperCase();
                l = a + l.slice(1);
                r += l + " ";
            });
            return r.substring(0, r.length - 1);
        }
    };
};

angular.module('rrms')
    .filter('caser', f);

})();