/**
 * Created by Asiel on 12/26/2016.
 */

(function(){

'use strict';

var f = function () {
    return function (data, length, append) {
        if (data) {
            data = data.toString();
            length = length ? length : data.length;
            return data.length <= length ? data : data.substring(0, length) + (append ? append : "")
        }
    }
};

angular.module('gmsBoilerplate')
    .filter('trimmer', f);
})();