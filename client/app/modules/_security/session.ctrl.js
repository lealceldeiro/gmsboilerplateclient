/**
 * Created by Asiel on 11/6/2016.
 */

(function () {

    'use strict';

    var sessionCtrl = function (sessionSrv, navigationSrv, ROUTE, systemSrv, configSrv, $timeout, $translate) {
        var vm = this;
        var keyP = "__SESSIONCTRL__";
        var MAX_RETRY = 3, retries = 0;

        vm.wizard = {
            lan: {
                'spanish': 'es',
                'english': 'en'
            },
            isMultiEntityApp: false,

            init: fnInit,

            logout: fnLogout,
            go: goTo,

            viewProfile: fnViewProfile,

            changeLanguage: fnChangeLanguage
        };

        vm.wizard.init();

        //region show/hiders
        var p = vm.wizard.permissions;
        var up = systemSrv.grant;
        vm.wizard.show = {
            settings: function () {
                return !(
                    p.indexOf(up.READ_USER) === -1
                    && p.indexOf(up.READ_ROLE) === -1
                    && p.indexOf(up.READ_PERMISSION) === -1
                )
            },

            manageOwnedEntity: function () { return p.indexOf(up.MANAGE_OWNED_ENTITY) !== -1; },
            readOwnedEntity:   function () { return p.indexOf(up.READ_OWNED_ENTITY) !== -1; },
            createOwnedEntity: function () { return p.indexOf(up.CREATE_OWNED_ENTITY) !== -1;},
            updateOwnedEntity: function () { return p.indexOf(up.UPDATE_OWNED_ENTITY) !== -1;},
            deleteOwnedEntity:  function () { return p.indexOf(up.DELETE_OWNED_ENTITY) !== -1;},

            manageUser: function () { return p.indexOf(up.MANAGE_USER) !== -1; },
            readUser:   function () { return p.indexOf(up.READ_USER) !== -1; },
            createUser: function () { return p.indexOf(up.CREATE_USER) !== -1;},
            updateUser: function () { return p.indexOf(up.UPDATE_USER) !== -1;},
            deleteUser:  function () { return p.indexOf(up.DELETE_USER) !== -1;},

            manageRole: function () { return p.indexOf(up.MANAGE_ROLE) !== -1; },
            readRole:   function () { return p.indexOf(up.READ_ROLE) !== -1; },
            createRole: function () { return p.indexOf(up.CREATE_ROLE) !== -1;},
            updateRole: function () { return p.indexOf(up.UPDATE_ROLE) !== -1;},
            deleteRole:  function () { return p.indexOf(up.DELETE_ROLE) !== -1;},

            managePermission: function () { return p.indexOf(up.MANAGE_PERMISSION) !== -1; },
            readPermission:   function () { return p.indexOf(up.READ_PERMISSION) !== -1; },
            createPermission: function () { return p.indexOf(up.CREATE_PERMISSION) !== -1;},
            updatePermission: function () { return p.indexOf(up.UPDATE_PERMISSION) !== -1;},
            deletePermission:  function () { return p.indexOf(up.DELETE_PERMISSION) !== -1;}
        };
        //endregion

        return vm.wizard;

        //fn
        function fnInit() {
            if (angular.isDefined(configSrv.config.multiEntity)) {
                vm.wizard.isMultiEntityApp = configSrv.config.multiEntity;
            }
            else { _loadConfig(); }
            if (sessionSrv.isLogged()) {
                vm.wizard.user = sessionSrv.currentUser();
                vm.wizard.oEntity = sessionSrv.loginEntity();
                vm.wizard.permissions = sessionSrv.getPermissions();

                var lan = sessionSrv.getLanguage() || $translate.preferredLanguage();
                fnChangeLanguage(lan, true);

                navigationSrv.goTo(navigationSrv.DEFAULT_PATH)
            }
            else{
                navigationSrv.goTo(navigationSrv.LOGIN_PATH);
            }
        }

        function fnLogout() {
            sessionSrv.logOut();
            navigationSrv.goTo(ROUTE.LOGIN);
        }

        function goTo(r) {
            navigationSrv.goTo(r);
        }

        function fnViewProfile() {
            navigationSrv.goTo(ROUTE.USER_VIEW, ROUTE.USER_VIEW_PL, sessionSrv.currentUser().id);
        }

        function _loadConfig() {
            var fnKey = keyP + "_isSingleEntityApp";
            configSrv.loadConfig().then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, false);
                    if (e) {
                        configSrv.config = systemSrv.getItems(fnKey);
                        vm.wizard.isMultiEntityApp = configSrv.config.multiEntity;
                    }
                    else {
                        if (retries++ < MAX_RETRY) {
                            $timeout(function () {
                                _loadConfig();
                            }, 3000)
                        }
                    }
                }
            );
        }

        function fnChangeLanguage(lan, doNotUpdateLocalStorage) {
            $translate.use(lan);
            if (!doNotUpdateLocalStorage) {
                configSrv.changeLanguage(lan);
            }
        }

    };

    angular.module('rrms')
        .controller('sessionCtrl', ['sessionSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'configSrv', '$timeout',
            '$translate', sessionCtrl]);

})();