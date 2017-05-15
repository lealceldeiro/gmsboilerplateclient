/**
 * Created by Asiel on 11/6/2016.
 */

(function() {

    'use strict';

    var env = {
        api: {},
        permissions: {},
        supportHtml5: true
    };
    var lan = {};

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

    //region language-loading...
    var languages = ['en', 'es'];
    for(var lp = 0; lp < languages.length; lp++){
        (function (idx) {
            $.getJSON("/client/app/i18n/" + languages[idx] + ".json", function(translations) {
                lan[languages[idx]] = translations;
            });
        })(lp);
    }
    //endregion

    var config = function ($logProvider) {
        $logProvider.debugEnabled(true);
    };

    angular.module
    ('gmsBoilerplate',
        [
            'ngRoute',                                          //routing
            'ngSanitize',                                       //ngSanitize module (for ui-select)
            'cl.paging',                                        //pagination
            'LocalStorageModule',                               //local storage module, used for instance for storing auth token
            'ngMaterial',
            'ngMessages',
            'pascalprecht.translate',                           //angular-translate
            'ngPasswordStrength'

        ]
    )
        .constant('__env', env)         // Register environment in AngularJS as constant
        .constant('lan', lan)           // Register languages strings as constant object
        .config(['$logProvider', config]);

})();