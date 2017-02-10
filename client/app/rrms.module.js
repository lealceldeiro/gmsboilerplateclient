/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function() {

    var env = {
        api: {},
        permissions: {}
    };

    // Import variables if present (from vars.js)
    $.getJSON("/vars.json", function(json) {
        if (json) {
            Object.assign(env.api, json);
            env.varsFound = true;
        }
    });
    // Import permissions
    $.getJSON("/permissions.json", function(json) {
        if (json) {
            Object.assign(env.permissions, json);
        }
    });

    var config = function ($logProvider) {
        $logProvider.debugEnabled(true);
    };

    angular.module
    ('rrms',
        [
            'ngRoute',                                          //routing
            'ngSanitize',                                       //ngSanitize module (for ui-select)
            'ui.select',                                        //ui-select component for select options
            'angularUtils.directives.dirPagination',            //pagination
            'LocalStorageModule',                               //local storage module, used for instance for storing auth token
            'ngMaterial',
            'ngMessages'

        ]
    )
        .constant('__env', env)         // Register environment in AngularJS as constant
        .config(['$logProvider', config]);


})();