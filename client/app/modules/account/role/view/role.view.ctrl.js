/**
 * Created by Asiel on 11/9/2016.
 */

(function () {

    'use strict';

    var roleViewCtrl = function (ROUTE, indexSrv, roleSrv, navigationSrv, notificationSrv, systemSrv, blockSrv, dialogSrv) {
        var vm = this;
        const keyP = 'ROLE_VIEW';

        vm.wizard = {
            role: null,

            roleData: null,

            permissions: {
                itemsPerPage: 5,
                total: 0,
                offset: 0
            },

            init: fnInit,
            cancel: fnCancel,
            edit: fnEdit,
            remove: fnRemove
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            var p = navigationSrv.currentParams();
            if (p && null !== p.id && typeof p.id !== 'undefined' && p.id !== 'undefined'&& p.id !== 'null') {
                vm.id = p.id;
                fnLoadData(p.id);
                indexSrv.siteTile = 'Ver Rol';
            }
            else{
                notificationSrv.showNotification(notificationSrv.utilText.mustSelectElement.es);
                navigationSrv.goTo(ROUTE.ROLES);
            }
        }

        function fnLoadData(id) {
            blockSrv.setIsLoading(vm.wizard.roleData,true);
            var fnKey = keyP + "fnLoadData";
            //get info
            roleSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.role = systemSrv.getItem(fnKey);
                    }
                    blockSrv.setIsLoading(vm.wizard.roleData);
                }
            );

            _loadPermissions(id);
        }

        function fnRemove() {
            var buttons = [{text:"Borrar", function: _doRemove, primary: true}];
            dialogSrv.showDialog("Confirmación", "Seguro desea eliminar este rol?", buttons);

        }

        function _doRemove() {
            var fnKey = keyP + "_doRemove";
            blockSrv.block();
            roleSrv.remove(vm.id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        navigationSrv.goTo(ROUTE.ROLES);
                    }
                    blockSrv.unBlock();
                }
            )
        }


        function fnCancel() {
            navigationSrv.goTo(ROUTE.ROLES);
        }

        function fnEdit() {
            navigationSrv.goTo(ROUTE.ROLE_EDIT, ROUTE.ROLE_EDIT_PL, vm.id);
        }

        function _loadPermissions(id) {
            var fnKey2 = keyP + "_loadPermissions";
            vm.wizard.permissions.all = [];
            vm.wizard.permissions.total = 0;

            blockSrv.setIsLoading(vm.wizard.permissions,true);
            roleSrv.permissionsByUser(id, 0, 0).then(
                function (data) {
                    blockSrv.setIsLoading(vm.wizard.permissions);
                    var e = systemSrv.eval(data, fnKey2, false, true);
                    if (e) {
                        var items = systemSrv.getItems(fnKey2);
                        for(var i = 0, l = items.length; i < l; i++){
                            vm.wizard.permissions.all.push(items[i].label);
                        }
                        vm.wizard.permissions.total = systemSrv.getTotal(fnKey2);
                    }
                }
            )
        }

    };

    angular.module('rrms')
        .controller('roleViewCtrl', ['ROUTE', 'indexSrv', 'roleSrv', 'navigationSrv', 'notificationSrv', 'systemSrv', 'blockSrv',
            'dialogSrv', roleViewCtrl]);

})();