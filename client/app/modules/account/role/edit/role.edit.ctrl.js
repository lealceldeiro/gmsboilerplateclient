/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleEditCtrl = function (indexSrv, roleSrv, navigationSrv, ROUTE, systemSrv, notificationSrv, blockSrv, permissionSrv) {
        var vm = this;
        const keyP = 'ROLE_EDIT';

        var flagSearch = false;

        vm.wizard = {
            role: {},

            roleData: null,

            permissions: {

                offset: 0,
                max: 8,
                maxLinks: 5,

                all: [],
                selected: null
            },

            init: fnInit,
            cancel: fnCancel,
            save: fnSave,

            searchPermissions: fnSearchPermissions,
            setIsSearching: fnSetIsSearching
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            if (navigationSrv.currentPath() === ROUTE.ROLE_NEW) {
                indexSrv.siteTile = 'Nuevo Rol';

                _loadPermissions();
            }
            else {
                vm.wizard.role = null;
                var p = navigationSrv.currentParams();
                if (p && null !== p.id && typeof p.id !== 'undefined' && p.id != 'undefined'&& p.id != 'null') {
                    vm.id = p.id;
                    fnLoadData(p.id);
                    indexSrv.siteTile = 'Editar Rol';
                }
                else{
                    notificationSrv.showNotif(notificationSrv.utilText.mustSelectElement.es,
                        notificationSrv.utilText.titleError.es, notificationSrv.type.ERROR);
                    navigationSrv.goTo(ROUTE.ROLES);
                }
            }
        }

        function fnLoadData(id) {
            blockSrv.setIsLoading(vm.wizard.roleData,true);
            var fnKey = keyP + "fnLoadData";
            //get info
            roleSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey,  false, true);
                    if (e) {
                        vm.wizard.role = systemSrv.getItem(fnKey);
                    }
                    blockSrv.setIsLoading(vm.wizard.roleData);
                }
            );
            _loadPermissionsInitial(id);
        }

        function fnSave(form) {
            if (form && form.$valid) {
                blockSrv.block();
                var params = {
                    label : vm.wizard.role.label,
                    description : vm.wizard.role.description,
                    enabled : vm.wizard.role.enabled,
                    permissions: []
                };
                angular.forEach(vm.wizard.permissions.selected, function (element) {
                    params.permissions.push(element.id)
                });

                var fnKey = keyP + "fnSave";
                roleSrv.save(params, vm.id).then(
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
            navigationSrv.goTo(ROUTE.ROLES);
        }

        function _loadPermissions(criteria) {
            vm.wizard.permissions.all = [];

            var fnKey = keyP + "_loadPermissions";

            permissionSrv.search(0, 0, criteria).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.permissions.all = systemSrv.getItems(fnKey);
                    }
                }
            )
        }

        function _loadPermissionsInitial(id, criteria) {
            vm.wizard.permissions.all = [];
            var fnKey = keyP + "_loadPermissionsInitial";

            roleSrv.permissionsByUser(id, 0).then(
                function (data) {
                    var fnKey2 = fnKey + "2";
                    var e = systemSrv.eval(data, fnKey2, false, true);
                    if (e) {
                        vm.wizard.permissions.selected = systemSrv.getItems(fnKey2);

                        permissionSrv.search(0, 0, criteria).then( //zero for avoiding issue with ui-select filtering
                            function (data) {
                                e = systemSrv.eval(data, fnKey, false, true);
                                if (e) {
                                    vm.wizard.permissions.all = systemSrv.getItems(fnKey);
                                }
                            }
                        )
                    }
                }
            );
        }


        function fnSearchPermissions(criteria) {
            if (flagSearch) {
                _loadPermissions(criteria);
            }
        }

        function fnSetIsSearching(s) {
            flagSearch = s === true;
            if (!flagSearch) {
                _loadPermissions();
            }
        }

    };

    roleEditCtrl.$inject = ['indexSrv', 'roleSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv', 'blockSrv',
        'permissionSrv'];

    angular.module('rrms')
        .controller('roleEditCtrl', roleEditCtrl);

})();