/**
 * Created by Asiel on 11/9/2016.
 */

(function () {

    'use strict';

    var roleEditCtrl = function (indexSrv, roleSrv, navigationSrv, ROUTE, systemSrv, notificationSrv, blockSrv,
                                 permissionSrv, dialogSrv, $filter) {
        var vm = this;
        const keyP = 'ROLE_EDIT';
        var permissionsTabTitles = null;
        var permissionsTabContents = null;

        vm.wizard = {
            role: {},

            roleData: null,

            permissions: {

                offset: 0,
                max: 8,
                maxLinks: 5,

                all: [],
                selected: []
            },

            init: fnInit,
            cancel: fnCancel,
            save: fnSave,

            searchPermissions: fnSearchPermissions,

            showRoleListDialog: fnShowRoleListDialog
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
                    notificationSrv.showNotification(notificationSrv.utilText.mustSelectElement.es);
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
                            //success, go back to list
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
            if (!criteria) {
                criteria = vm.wizard['PerSearchTerm'];
            }
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
                _loadPermissions(criteria);
        }

        function fnShowRoleListDialog() {
            if (!permissionsTabTitles) {
                var fnKey = keyP + "_loadPermissions-fnShowRoleListDialog";

                permissionSrv.search(0, 0).then(
                    function (data) {
                        var e = systemSrv.eval(data, fnKey, false, true);
                        if (e) {
                            permissionsTabTitles = [];
                            permissionsTabContents = [];
                            var aux = systemSrv.getItems(fnKey);
                            var name, idx, label;

                            for(var i = 0, l = aux.length; i < l; i++){
                                name = aux[i].name.substring(aux[i].name.indexOf("__") + 2, aux[i].name.length);
                                if (name.length > 1) {
                                    idx = permissionsTabTitles.indexOf(name);
                                    label = $filter('caser')(aux[i].label);
                                    if (idx == -1) {
                                        permissionsTabTitles.push(name);
                                        permissionsTabContents[permissionsTabTitles.length - 1] = label;
                                    }
                                    else{
                                        permissionsTabContents[idx] += "<br/>" + "<br/>" + label;
                                    }
                                }
                            }

                            __show();
                        }
                    }
                )
            }else{
                __show();
            }
        }

        function __show() {
            dialogSrv.showTabDialog("Permisos (" + vm.wizard.permissions.all.length + ")", permissionsTabTitles, permissionsTabContents);
        }

    };

    angular.module('rrms')
        .controller('roleEditCtrl', ['indexSrv', 'roleSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv', 'blockSrv',
            'permissionSrv', 'dialogSrv', '$filter', roleEditCtrl]);

})();