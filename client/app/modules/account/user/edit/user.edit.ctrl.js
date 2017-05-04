/**
 * Created by Asiel on 23/12/2016.
 */

(function () {

    'use strict';

    var f = function (indexSrv, userSrv, navigationSrv, ROUTE, systemSrv, notificationSrv, roleSrv, blockSrv, sessionSrv,
                      $timeout, ownedEntitySrv, dialogSrv, searchSrv) {
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

            rolesToSave: [],

            passwordMatch:{},

            loadRoles: fnLoadRoles,

            init: fnInit,
            cancel: fnCancel,
            save: fnSave,

            checkPasswordMatch: fnCheckPasswordMatch,
            isPasswordRequired: fnIsPasswordRequired,

            selectedEntity: null,
            saveRolesAndSelectEntity: fnSaveRolesAndSelectEntity
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {

            fnLoadRoles();

            if (navigationSrv.currentPath() === ROUTE.USER_NEW) {
                indexSrv.siteTile = 'Nuevo Usuario';
                _loadAllEntitiesForCurrentUser();
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
            var def;
            var cPerm = sessionSrv.getPermissions();
            if (cPerm.indexOf(systemSrv.grant.READ_ALL_OWNED_ENTITY) !== -1) {
                def = ownedEntitySrv.searchAll(0, 0);
            }
            else {
                def = userSrv.entitiesByUser(id, 0, 0);
            }
            def.then(function (data) {
                vm.wizard.entities = [];
                var e = systemSrv.eval(data, fnKey2, false, true);
                if (e) {
                    vm.wizard.entities = systemSrv.getItems(fnKey2);

                    //user is associated to only one entity
                    if (vm.wizard.entities.length === 1) {
                        fnLoadAssignedRoles(id, vm.wizard.entities[0]['id']);
                    }
                    else { //save data for the first entity, so the form is valid
                        fnSaveRolesAndSelectEntity(vm.wizard.entities[0]);
                    }
                }
            });
        }

        function fnSave(form) {
            if (vm.wizard.entities.length > 1) {
                fnSaveRolesAndSelectEntity(); //save data for last entity clicked
            }

            if (form && form.$valid && !vm.wizard.passwordMatch.notMatch) {
                if (typeof vm.id !== 'undefined' && vm.id !== null && !vm.wizard.entity.enabled) {
                    var u = sessionSrv.currentUser();
                    if (u) {
                        if (u.id == vm.id) {
                            var buttons = [{text:"Guardar", function: _doSave, primary: true}];
                            dialogSrv.showDialog("Confirmación", "Va a guardar sus datos con la propiedad 'activo' sin" +
                                " marcar. Esto hará que no pueda acceder al sistema. Seguro desea continuar?", buttons);
                        }
                        else { _doSave(true); }
                    } else { _doSave(true); }
                }
                else { _doSave(true); }
            }
        }

        function _doSave(notCurrentUser) {
            var params = {
                username : vm.wizard.entity.username,
                name : vm.wizard.entity.name,
                email : vm.wizard.entity.email,
                password : vm.wizard.entity.password,
                enabled: vm.wizard.entity.enabled
            };

            if (vm.wizard.entities.length > 1) {
                params.roles = vm.wizard.rolesToSave;
            }
            else {
                params.roles = [{entity: vm.wizard.entity[0]['id'], roles: []}];
                angular.forEach(vm.wizard.roles.selected, function (element) {
                    params.roles[0].roles.push(element.id)
                });
            }

            blockSrv.block();

            var fnKey = keyP + "fnSave";

            userSrv.save(params, vm.id).then(
                function (data) {
                    blockSrv.unBlock();
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        if (notCurrentUser !== true) {
                            sessionSrv.logOut();
                            navigationSrv.goTo(ROUTE.LOGIN);
                        } else { fnCancel(); }
                    }
                }
            )
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.USERS);
        }

        function fnCheckPasswordMatch() {
            delete vm.wizard.passwordMatch.notMatch;
            if (vm.wizard.entity.password && vm.wizard.entity.password2 &&
                vm.wizard.entity.password != vm.wizard.entity.password2) {
                vm.wizard.passwordMatch.notMatch = true;
            }
        }

        function fnIsPasswordRequired() {
            return typeof vm.id === 'undefined' || vm.id === null;
        }

        function fnLoadRoles() {
            blockSrv.block();
            vm.wizard.roles.all = [];
            vm.wizard.roles.selected = [];

            var fnKey = keyP + "fnLoadRoles";

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

                        return data;
                    }
                )
            }
            else if(vm.priv.tryLoadRoles++ < vm.priv.MAX_TRY) {
                $timeout(function () {
                    return fnLoadAssignedRoles(uid, eid);
                }, 500)
            }
        }

        function _loadAllEntitiesForCurrentUser() {
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

        //region entities-handling
        function fnSaveRolesAndSelectEntity(eParam) {
            if (vm.wizard.selectedEntity) {
                //save previously selected or removed roles
                var prevEntity = searchSrv.find(vm.wizard.rolesToSave, 'entity', vm.wizard.selectedEntity.id);
                var tempRoles = [];
                angular.forEach(vm.wizard.roles.selected, function (r) {
                    tempRoles.push(r.id)
                });
                if (prevEntity) {
                    prevEntity.roles = tempRoles;
                }
                else {
                    vm.wizard.rolesToSave.push({entity: vm.wizard.selectedEntity.id, roles: tempRoles})
                }
            }
            if (eParam) {
                vm.wizard.selectedEntity = Object.assign(eParam);
                var currentEntity = searchSrv.find(vm.wizard.rolesToSave, 'entity', eParam.id);
                if (currentEntity) {
                    vm.wizard.roles.selected = searchSrv.findCollection(vm.wizard.roles.all, 'id', currentEntity.roles);
                } else {
                    return fnLoadAssignedRoles(vm.id, vm.wizard.selectedEntity.id);
                }
            }
        }
        //endregion

    };

    angular.module('rrms')
        .controller('userEditCtrl', ['indexSrv', 'userSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv', 'roleSrv',
            'blockSrv', 'sessionSrv', '$timeout', 'ownedEntitySrv', 'dialogSrv', 'searchSrv', f]);

})();