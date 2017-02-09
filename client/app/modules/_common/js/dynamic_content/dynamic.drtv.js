/**
 * Created by Asiel on 11/13/2016.
 */

(function () {

    var dynamic = function($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, ele, attrs) {
                scope.$watch(attrs.dynamic, function(html) {
                    if (html) {
                        ele.html(html);
                        $compile(ele.contents())(scope);
                    }

                });
            }
        };
    };

    dynamic.$inject = ['$compile'];

    angular.module('rrms')
        .directive('dynamic', dynamic);
}());