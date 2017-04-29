/**
 * Created by Asiel on 23/12/2016.
 */

(function () {

    'use strict';

    var f = function (ROUTE, indexSrv, userSrv, navigationSrv, notificationSrv, systemSrv, blockSrv, sessionSrv,
                      dialogSrv) {
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

            var fnKey2 = keyP + "fnLoadData-entitiesByUser";
            userSrv.entitiesByUser(id, 0, 0).then(function (data) {
                vm.wizard.entities = [];
                var e = systemSrv.eval(data, fnKey2, false, true);
                if (e) {
                    vm.wizard.entities = systemSrv.getItems(fnKey2);

                    //user is associated to only one entity
                    if (vm.wizard.entities.length === 1) {
                        _loadRoles(id, vm.wizard.entities[0]['id']);
                    }
                    else {
                        //todo
                    }
                }
            });
        }

        function fnRemove() {
            var buttons = [{text:"Borrar", function: _doRemove, primary: true}];
            dialogSrv.showDialog("Confirmación", "Seguro desea eliminar este usuario?", buttons);

        }

        function _doRemove() {
            var fnKey = keyP + "_doRemove";
            blockSrv.block();
            userSrv.remove(vm.id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        navigationSrv.goTo(ROUTE.USERS);
                        blockSrv.unBlock();
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

        function _loadRoles(id, eid) {
            blockSrv.setIsLoading(vm.wizard.roles, true);
            vm.wizard.roles.all = [];
            vm.wizard.roles.total = 0;
            var fnKey2 = keyP + "_loadRoles";

            userSrv.rolesByUserAndEntity(id, eid, 0, 0).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey2, false, true);
                    if (e) {
                        var items = systemSrv.getItems(fnKey2);
                        for(var i = 0, l = items.length; i < l; i++){
                            vm.wizard.roles.all.push(items[i].label);
                        }
                        vm.wizard.roles.total = systemSrv.getTotal(fnKey2);
                    }
                    blockSrv.setIsLoading(vm.wizard.roles);
                }
            )
        }

        function fnChangePage(newPageNumber) {
            if (typeof newPageNumber === 'undefined' || newPageNumber < 1 || newPageNumber === null) {
                newPageNumber = 1;
            }
            vm.wizard.roles.offset = (newPageNumber - 1) * vm.wizard.roles.itemsPerPage;

            _loadRoles(vm.id);
        }

    };

    angular.module('rrms')
        .controller('userViewCtrl', ['ROUTE', 'indexSrv', 'userSrv', 'navigationSrv', 'notificationSrv', 'systemSrv',
            'blockSrv', 'sessionSrv', 'dialogSrv', f]);

})();