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
                loginSrv.login(vm.wizard.emailOrUsername, vm.wizard.password).then(
                    function (data) {
                        var e = systemSrv.evalAuth(data, false, false);
                        if (e) {
                            var key = "fnLogin" + keyP;
                            loginSrv.getLoginEntity().then(
                                function (data) {
                                    var e2 = systemSrv.eval(data, key, false,  true);
                                    if (e2) {
                                        _moveToMain();
                                        sessionSrv.setCurrentOwnedEntity(systemSrv.getItem(key));
                                    }
                                    else{
                                        _unblockS();
                                    }
                                }
                            );

                            var key2 = "fnLogin-getByUsername" + keyP;
                            userSrv.getByUsername(systemSrv.getAuthUser()).then(
                                function (data) {
                                    var e2 = systemSrv.eval(data, key2);
                                    if (e2) {
                                        _moveToMain();
                                        sessionSrv.setCurrentUser(systemSrv.getItem(key2));
                                    }
                                    else{
                                        _unblockS();
                                    }
                                }
                            );

                            sessionSrv.setPermissions(systemSrv.gtAuthPermissions());
                            sessionSrv.setSecurityToken(systemSrv.getAuthToken());
                            sessionSrv.setSecurityRefreshToken(systemSrv.getAuthRefreshToken());
                        }
                        else{
                            blockSrv.unBlock();
                        }
                    }
                );
            }
        }

        function _moveToMain() {
            if (++m >= total) {
                m = 0;

                //notify of login action
                $rootScope.$broadcast('TRIGGER_ACTION_AUTH'); //$rootScope instead of $scope so the change is propagated to all scopes

                navigationSrv.goTo(ROUTE.MAIN);
                blockSrv.unBlock();
            }
        }

        function _unblockS() {
            if (++m2 >= total2) {
                blockSrv.unBlock();
            }
        }

    };

    loginCtrl.$inject = ['indexSrv', 'sessionSrv', 'navigationSrv', 'systemSrv', 'loginSrv', 'ROUTE', 'blockSrv',
        'userSrv', '$rootScope'];

    angular.module('rrms')
        .controller('loginCtrl', loginCtrl);

})();