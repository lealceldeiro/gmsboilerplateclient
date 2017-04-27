/**
 * Created by Asiel on 23/12/2016.
 */

'use strict';

(function () {

    var f = function (ROUTE, indexSrv, userSrv, navigationSrv, notificationSrv, systemSrv, blockSrv, sessionSrv) {
        var vm = this;
        const keyP = 'USER_VIEW';

        vm.wizard = {
            entity: null,

            entityData: null,

            roles: {
                itemsPerPage: 5,
                total: 0,
                offset: 0
            },

            init: fnInit,
            cancel: fnCancel,
            edit: fnEdit,
            remove: fnRemove,

            changePage: fnChangePage
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            var p = navigationSrv.currentParams();
            if (p && null !== p.id && typeof p.id !== 'undefined' && p.id !== 'undefined'&& p.id !== 'null') {
                vm.id = p.id;
                fnLoadData(p.id);
                indexSrv.siteTile = 'Ver Usuario';
            }
            else{
                notificationSrv.showNotification(notificationSrv.utilText.mustSelectElement.es);
                navigationSrv.goTo(ROUTE.USERS);
            }
        }

        function fnLoadData(id) {
            blockSrv.setIsLoading(vm.wizard.entityData,true);
            var fnKey = keyP + "fnLoadData1";
            //get info
            userSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.entity = systemSrv.getItem(fnKey);
                    }
                    blockSrv.setIsLoading(vm.wizard.entityData);
                }
            );
            _loadRoles(id);
        }

        function fnRemove() {
            var fnKey = keyP + "fnRemove";
            userSrv.remove(vm.id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        navigationSrv.goTo(ROUTE.USERS);
                    }
                }
            )
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.USERS);
        }

        function fnEdit() {
            navigationSrv.goTo(ROUTE.USER_EDIT, ROUTE.USER_EDIT_PL, vm.id);
        }

        function _loadRoles(id) {
            blockSrv.setIsLoading(vm.wizard.roles, true);

            var fnKey2 = keyP + "_loadRoles";
            var offset = vm.wizard.roles.offset;
            var max = vm.wizard.roles.itemsPerPage;
            var ent = sessionSrv.loginEntity();

            userSrv.rolesByUserAndEntity(id, ent ? ent.id : 0, offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey2, false, true);
                    if (e) {
                        vm.wizard.roles.all = systemSrv.getItems(fnKey2);
                        vm.wizard.roles.total = systemSrv.getTotal(fnKey2);
                    }
                    blockSrv.setIsLoading(vm.wizard.roles);
                }
            )
        }

        function fnChangePage(newPageNumber) {
            if (typeof newPageNumber == 'undefined' || newPageNumber < 1 || newPageNumber == null) {
                newPageNumber = 1;
            }
            vm.wizard.roles.offset = (newPageNumber - 1) * vm.wizard.roles.itemsPerPage;

            _loadRoles(vm.id);
        }

    };

    f.$inject = ['ROUTE', 'indexSrv', 'userSrv', 'navigationSrv', 'notificationSrv', 'systemSrv', 'blockSrv', 'sessionSrv'];

    angular.module('rrms')
        .controller('userViewCtrl', f);

})();