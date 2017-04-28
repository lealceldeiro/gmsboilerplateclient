/**
 * Created by Asiel on 23/12/2016.
 */

(function () {

    'use strict';

    var f = function (indexSrv, userSrv, navigationSrv, ROUTE, systemSrv, notificationSrv, roleSrv, blockSrv, sessionSrv,
                      $timeout, ownedEntitySrv) {
        var vm = this;
        const keyP = 'USER_EDIT';

        vm.priv = {
            MAX_TRY: 3,
            tryLoadRoles: 0
        };

        vm.wizard = {
            entity: {},

            entityData: null,

            roles: {

                offset: 0,
                max: 8,
                maxLinks: 5,

                all: [],
                selected: null
            },

            loadRoles: fnLoadRoles,

            init: fnInit,
            cancel: fnCancel,
            save: fnSave
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {

            fnLoadRoles();

            if (navigationSrv.currentPath() === ROUTE.USER_NEW) {
                indexSrv.siteTile = 'Nuevo Usuario';
                _loadAllEntities();
                vm.wizard.entity = {enabled: true};
            }
            else {
                vm.wizard.entity = null;
                var p = navigationSrv.currentParams();
                if (p && null !== p.id && typeof p.id !== 'undefined' && p.id !== 'undefined'&& p.id !== 'null') {
                    vm.id = p.id;
                    fnLoadData(p.id);
                    indexSrv.siteTile = 'Editar Usuario';
                }
                else{
                    notificationSrv.showNotification(notificationSrv.utilText.mustSelectElement.es);
                    navigationSrv.goTo(ROUTE.USERS);
                }
            }
        }

        function fnLoadData(id) {
            blockSrv.setIsLoading(vm.wizard.entityData, true);
            var fnKey = keyP + "fnLoadData";
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
                var e = systemSrv.eval(data, fnKey2, false, true);
                if (e) {
                    vm.wizard.entities = systemSrv.getItems(fnKey2);


                    //user is associated to only one entity
                    if (vm.wizard.entities.length === 1) {
                        fnLoadAssignedRoles(id, vm.wizard.entities[0]['id']);
                    }
                    else {
                        //todo
                    }
                }
            });
        }

        function fnSave(form) {
            if (form && form.$valid) {
                if (vm.wizard.entities.length > 1) {
                    //todo
                }
                else {
                    var le = vm.wizard.entities[0];
                }

                blockSrv.block();
                var params = {
                    username : vm.wizard.entity.username,
                    name : vm.wizard.entity.name,
                    email : vm.wizard.entity.email,
                    password : vm.wizard.entity.password,

                    //todo: refactor for multi entity
                    roles: [],
                    entity: le ? le.id : 0,
                    //end todo

                    enabled: vm.wizard.entity.enabled
                };
                var fnKey = keyP + "fnSave";
                angular.forEach(vm.wizard.roles.selected, function (element) {
                    params.roles.push(element.id)
                });

                userSrv.save(params, vm.id).then(
                    function (data) {
                        blockSrv.unBlock();
                        var e = systemSrv.eval(data, fnKey, true, true);
                        if (e) {
                            fnCancel();
                        }
                    }
                )
            }
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.USERS);
        }

        function fnLoadRoles() {
            blockSrv.block();
            vm.wizard.roles.all = [];
            vm.wizard.roles.selected = [];

            var fnKey = keyP + "_loadRoles";

            roleSrv.searchAll(0, 0).then( //off: 0, max: 0
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.roles.all = systemSrv.getItems(fnKey);
                    }
                    blockSrv.unBlock();
                }
            )
        }

        function fnLoadAssignedRoles(uid, eid) {
            //all roles are loaded
            if (vm.wizard.roles.all.length > 0) {
                vm.wizard.roles.selected = [];

                var fnKey = keyP + "fnLoadAssignedRoles";

                roleSrv.search(uid, eid, 0, 0).then(
                    function (data) {
                        var e = systemSrv.eval(data, fnKey, false, true);
                        if (e) {
                            vm.wizard.roles.selected = systemSrv.getItems(fnKey);
                        }
                    }
                )
            }
            else if(vm.priv.tryLoadRoles++ < vm.priv.MAX_TRY) {
                $timeout(function () {
                    fnLoadAssignedRoles(uid, eid);
                }, 500)
            }
        }
        
        function _loadAllEntities() {
            blockSrv.block();
            var fnKey = keyP + "_loadAllEntities";
            vm.wizard.entities = [];
            var u = sessionSrv.currentUser();
            ownedEntitySrv.search(u.id, 0, 0).then(function (data) {
                var e = systemSrv.eval(data, fnKey, false, true);
                if (e) {
                    vm.wizard.entities = systemSrv.getItems(fnKey);
                }
                blockSrv.unBlock();
            })

        }

    };

    angular.module('rrms')
        .controller('userEditCtrl', ['indexSrv', 'userSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv', 'roleSrv',
            'blockSrv', 'sessionSrv', '$timeout', 'ownedEntitySrv', f]);

})();