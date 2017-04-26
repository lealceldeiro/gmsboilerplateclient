/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var loginCtrl = function (indexSrv, sessionSrv, navigationSrv, systemSrv, loginSrv, ROUTE, blockSrv, userSrv, $rootScope) {
        var vm = this;
        const keyP = 'LOGIN__';

        var m = 0, m2 = 0, total = 2, total2 = 2;

        vm.wizard = {

            emailOrUsername: null,
            password: null,

            init: fnInit,
            login: fnLogin
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Login'
        }

        function fnLogin(form) {
            if (form && form.$valid) {
                blockSrv.block();

                //do login
                loginSrv.login(vm.wizard.emailOrUsername, vm.wizard.password).then(
                    function (data) {
                        var e = systemSrv.evalAuth(data, false, false);
                        if (e) {
                            var key = "fnLogin-getByUsername" + keyP;

                            //get user data
                            userSrv.getByUsername(systemSrv.getAuthUser()).then(
                                function (data) {
                                    var e2 = systemSrv.eval(data, key);
                                    if (e2) {
                                        var key2 = "fnLogin-getLoginEntity" + keyP;

                                        //get last entity
                                        loginSrv.getLoginEntity(systemSrv.getItem(key).id).then(
                                            function (data) {
                                                var e3 = systemSrv.eval(data, key2, false, true);
                                                if (e3) {
                                                    var key3 = "fnLogin-entitiesByUser" + keyP;
                                                    userSrv.entitiesByUser(systemSrv.getItem(key)['id']).then(function (data) {

                                                        systemSrv.eval(data, key3, false, true);

                                                        var cu = sessionSrv.currentUser();
                                                        cu.entities = systemSrv.getItems(key3);
                                                        sessionSrv.setCurrentUser(cu);

                                                        //notify of login action
                                                        $rootScope.$broadcast('TRIGGER_ACTION_AUTH'); //$rootScope instead of $scope so the change is propagated to all scopes

                                                        navigationSrv.goTo(ROUTE.MAIN);

                                                        blockSrv.unBlock();
                                                    });

                                                    sessionSrv.setCurrentOwnedEntity(systemSrv.getItem(key2));
                                                }
                                                else { blockSrv.unBlock();}
                                            }
                                        );
                                        sessionSrv.setCurrentUser(systemSrv.getItem(key));
                                    }
                                    else { blockSrv.unBlock(); }
                                }
                            );

                            sessionSrv.setPermissions(systemSrv.gtAuthPermissions());
                            sessionSrv.setSecurityToken(systemSrv.getAuthToken());
                            sessionSrv.setSecurityRefreshToken(systemSrv.getAuthRefreshToken());
                        }
                        else {blockSrv.unBlock();}
                    }
                );
            }
        }
    };

    loginCtrl.$inject = ['indexSrv', 'sessionSrv', 'navigationSrv', 'systemSrv', 'loginSrv', 'ROUTE', 'blockSrv',
        'userSrv', '$rootScope'];

    angular.module('rrms')
        .controller('loginCtrl', loginCtrl);

})();