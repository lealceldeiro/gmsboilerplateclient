/**
 * Created by Asiel on 29/04/2017.
 */

(function () {

    'use strict';

    var f = function (indexSrv, ownedEntitySrv, navigationSrv, ROUTE, systemSrv, notificationSrv, blockSrv, sessionSrv) {
        var vm = this;
        const keyP = 'OWNED_ENTITY_EDIT';

        vm.wizard = {
            entity: {},

            entityData: null,

            init: fnInit,
            cancel: fnCancel,
            save: fnSave
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            if (navigationSrv.currentPath() === ROUTE.OWNED_ENTITY_NEW) {
                indexSrv.siteTile = 'Nueva Entidad';
            }
            else {
                vm.wizard.entity = null;
                var p = navigationSrv.currentParams();
                if (p && null !== p.id && typeof p.id !== 'undefined' && p.id !== 'undefined'&& p.id !== 'null') {
                    vm.id = p.id;
                    fnLoadData(p.id);
                    indexSrv.siteTile = 'Editar Entidad';
                }
                else{
                    notificationSrv.showNotification(notificationSrv.utilText.mustSelectElement.es);
                    navigationSrv.goTo(ROUTE.OWNED_ENTITY);
                }
            }
        }

        function fnLoadData(id) {
            blockSrv.setIsLoading(vm.wizard.entityData, true);
            var fnKey = keyP + "fnLoadData";
            //get info
            ownedEntitySrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.entity = systemSrv.getItem(fnKey);
                    }
                    blockSrv.setIsLoading(vm.wizard.entityData);
                }
            );
        }

        function fnSave(form) {
            if (form && form.$valid) {
                blockSrv.block();
                var params = {
                    username : vm.wizard.entity.username,
                    name : vm.wizard.entity.name,
                    description : vm.wizard.entity.description
                };
                var fnKey = keyP + "fnSave";
                ownedEntitySrv.save(params, vm.id).then(
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
            navigationSrv.goTo(ROUTE.OWNED_ENTITY);
        }

    };

    angular.module('rrms')
        .controller('ownedEntityEditCtrl', ['indexSrv', 'ownedEntitySrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv',
            'blockSrv', 'sessionSrv', f]);

})();