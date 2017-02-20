/**
 * Created by Asiel on 23/12/2016.
 */

'use strict';

(function () {

    var f = function (indexSrv, userSrv, navigationSrv, ROUTE, systemSrv, notificationSrv, roleSrv, blockSrv, sessionSrv,
                      searchSrv) {
        var vm = this;
        const keyP = 'USER_EDIT';

        var flagSearch = false;

        vm.wizard = {
            entity: {},

            entityData: null,

            roles: {

                allLoaded: false,

                offset: 0,
                max: 8,
                maxLinks: 5,

                all: [],
                selected: null
            },

            setIsSearching: fnSetIsSearching,
            searchRoles: fnSearchRoles,
            loadRoles: fnLoadRoles,
            searchAllRoles: fnSearchAllRoles,

            init: fnInit,
            cancel: fnCancel,
            save: fnSave
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            if (navigationSrv.currentPath() === ROUTE.USER_NEW) {
                indexSrv.siteTile = 'Nuevo Usuario';

                fnLoadRoles();
            }
            else {
                vm.wizard.entity = null;
                var p = navigationSrv.currentParams();
                if (p && null !== p.id && typeof p.id !== 'undefined' && p.id != 'undefined'&& p.id != 'null') {
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
            blockSrv.setIsLoading(vm.wizard.entityData,true);
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
            _loadRolesInitial(id);
        }

        function fnSave(form) {
            if (form && form.$valid) {
                var le = sessionSrv.loginEntity();
                blockSrv.block();
                var params = {
                    username : vm.wizard.entity.username,
                    name : vm.wizard.entity.name,
                    email : vm.wizard.entity.email,
                    password : vm.wizard.entity.password,
                    roles: [],
                    entity: le ? le.id : 0
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

        function fnLoadRoles(criteria) {
            blockSrv.block();
            vm.wizard.roles.all = [];
            var temp = [];
            Object.assign(temp, vm.wizard.roles.selected);
            vm.wizard.roles.selected = [];

            var fnKey = keyP + "_loadRoles";
            var ent = sessionSrv.loginEntity();
            var u = sessionSrv.currentUser();

            roleSrv.search(u ? u.id : 0, ent ? ent.id : 0, 0, 0, criteria).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.roles.all = systemSrv.getItems(fnKey);

                        var idxA;
                        angular.forEach(temp, function (it) {
                            idxA = searchSrv.indexOf(vm.wizard.roles.all, 'id', it.id);
                            if (idxA !== -1) {
                                vm.wizard.roles.selected.push(vm.wizard.roles.all[idxA]);
                            }
                        });

                        if (!criteria) {
                            vm.wizard.roles.allLoaded = false;
                        }
                    }
                    blockSrv.unBlock();
                }
            )
        }

        function fnSearchAllRoles(criteria) {
            blockSrv.block();
            vm.wizard.roles.all = [];
            var temp = [];
            Object.assign(temp, vm.wizard.roles.selected);
            vm.wizard.roles.selected = [];

            var fnKey = keyP + "_loadRoles";
            roleSrv.searchAll(0, 0, criteria).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.roles.all = systemSrv.getItems(fnKey);
                        /*var r, idx, j = 0;
                         do {
                         r = vm.wizard.roles.selected[j++];
                         if (r) {
                         idx = searchSrv.indexOf(vm.wizard.roles.all, 'id', r.id);
                         vm.wizard.roles.all.splice(idx, 1);
                         }
                         } while(r);*/
                        var idxA;
                        angular.forEach(temp, function (it) {
                            idxA = searchSrv.indexOf(vm.wizard.roles.all, 'id', it.id);
                            if (idxA !== -1) {
                                vm.wizard.roles.selected.push(vm.wizard.roles.all[idxA]);
                            }
                        });
                        vm.wizard.roles.allLoaded = true
                    }
                    blockSrv.unBlock();
                }
            )
        }

        function _loadRolesInitial(id, criteria) {
            vm.wizard.roles.all = [];
            var fnKey = keyP + "_loadRolesInitial";

            var ent = sessionSrv.loginEntity();
            roleSrv.search(id, ent ? ent.id : 0, 0, 0, criteria).then(    //zero for avoiding issue with ui-select filtering
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.roles.all = systemSrv.getItems(fnKey);
                        vm.wizard.roles.selected = vm.wizard.roles.all;
                    }
                }
            );
        }

        function fnSearchRoles(criteria) {
            if (flagSearch) {
                if (vm.wizard.roles.allLoaded) {
                    fnSearchAllRoles(criteria);
                }
                else{
                    fnLoadRoles(criteria);
                }
            }
        }

        function fnSetIsSearching(s) {
            flagSearch = s === true;
            if (!flagSearch) {
                if (vm.wizard.roles.allLoaded) {
                    fnSearchAllRoles();
                }
                else{
                    fnLoadRoles();
                }
            }
        }
    };

    f.$inject = ['indexSrv', 'userSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv', 'roleSrv',
        'blockSrv', 'sessionSrv', 'searchSrv'];

    angular.module('rrms')
        .controller('userEditCtrl', f);

})();