/**
 * Created by Asiel on 23/12/2016.
 */

(function () {

    'use strict';

    var f = function (ROUTE, indexSrv, userSrv, navigationSrv, notificationSrv, systemSrv, blockSrv, sessionSrv,
                      dialogSrv, searchSrv, roleSrv) {
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

            rolesToShow: [],

            init: fnInit,
            cancel: fnCancel,
            edit: fnEdit,
            remove: fnRemove,

            selectedEntity: null,
            selectEntity: fnSelectEntity
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
                notificationSrv.showNotification(notificationSrv.type.WARNING, notificationSrv.utilText.select_element_required);
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
                        fnSelectEntity(vm.wizard.entities[0]);
                    }
                }
            });
        }

        function fnRemove() {
            var u = sessionSrv.currentUser();
            var msg = "Seguro desea eliminar este usuario?";
            var t = dialogSrv.type.QUESTION;
            if (u && u.id == vm.id) {
                t = dialogSrv.type.WARNING;
                msg = "Seguro deseas eliminar tu cuenta";
                vm.toRemoveProfile = true;
            }
            var buttons = [{text:"Borrar", function: _doRemove, primary: true}];
            dialogSrv.showDialog(t, "Confirmación", msg, buttons);

        }

        function _doRemove() {
            var fnKey = keyP + "_doRemove";
            blockSrv.block();
            userSrv.remove(vm.id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        if (vm.toRemoveProfile) {
                            sessionSrv.logOut();
                            navigationSrv.goTo(ROUTE.LOGIN);
                        }
                        else { navigationSrv.goTo(ROUTE.USERS); }
                    }
                    blockSrv.unBlock();
                }
            )
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.USERS);
        }

        function fnEdit() {
            navigationSrv.goTo(ROUTE.USER_EDIT, ROUTE.USER_EDIT_PL, vm.id);
        }

        function _loadRoles(id, eid, doNotBlockUI) {
            if (!doNotBlockUI) { blockSrv.setIsLoading(vm.wizard.roles, true); }
            vm.wizard.roles.all = [];
            vm.wizard.roles.total = 0;
            var fnKey2 = keyP + "_loadRoles";

            roleSrv.search(id, eid, 0, 0).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey2, false, true);
                    if (e) {
                        var items = systemSrv.getItems(fnKey2);
                        for(var i = 0, l = items.length; i < l; i++){
                            vm.wizard.roles.all.push(items[i].label);
                        }
                        vm.wizard.roles.total = systemSrv.getTotal(fnKey2);
                    }
                    if (!doNotBlockUI) { blockSrv.setIsLoading(vm.wizard.roles); }
                }
            )
        }

        //region entities-handling
        function fnSelectEntity(eParam) {
            if (vm.wizard.selectedEntity) {
                //save previously selected or removed roles
                var prevEntity = searchSrv.find(vm.wizard.rolesToShow, 'entity', vm.wizard.selectedEntity.id);
                var tempRoles = [];
                angular.forEach(vm.wizard.roles.selected, function (r) {
                    tempRoles.push(r.id)
                });
                if (prevEntity) {
                    prevEntity.roles = tempRoles;
                }
                else {
                    vm.wizard.rolesToShow.push({entity: vm.wizard.selectedEntity.id, roles: tempRoles})
                }
            }
            if (eParam) {
                vm.wizard.selectedEntity = Object.assign(eParam);
                var currentEntity = searchSrv.find(vm.wizard.rolesToShow, 'entity', eParam.id);
                if (currentEntity) {
                    vm.wizard.roles.selected = searchSrv.findCollection(vm.wizard.roles.all, 'id', currentEntity.roles);
                } else {
                    return _loadRoles(vm.id, vm.wizard.selectedEntity.id, false);
                }
            }
        }
        //endregion

    };

    angular.module('rrms')
        .controller('userViewCtrl', ['ROUTE', 'indexSrv', 'userSrv', 'navigationSrv', 'notificationSrv', 'systemSrv',
            'blockSrv', 'sessionSrv', 'dialogSrv', 'searchSrv', 'roleSrv', f]);

})();