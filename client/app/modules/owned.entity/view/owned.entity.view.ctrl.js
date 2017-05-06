/**
 * Created by Asiel on 29/01/2017.
 */

(function () {

    'use strict';

    var f = function (ROUTE, indexSrv, ownedEntitySrv, navigationSrv, notificationSrv, systemSrv, blockSrv, sessionSrv,
                      dialogSrv) {
        var vm = this;
        const keyP = 'OWNED_ENTITY_VIEW';

        vm.wizard = {
            entity: null,

            entityData: null,

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
                indexSrv.siteTile = 'Ver Entidad';
            }
            else{
                notificationSrv.showNotification(notificationSrv.type.WARNING, notificationSrv.utilText.mustSelectElement.es);
                navigationSrv.goTo(ROUTE.OWNED_ENTITY);
            }
        }

        function fnLoadData(id) {
            blockSrv.setIsLoading(vm.wizard.entityData,true);
            var fnKey = keyP + "fnLoadData1";
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

        function fnRemove() {
            var buttons = [{text:"Borrar", function: _doRemove, primary: true}];
            dialogSrv.showDialog(dialogSrv.type.QUESTION, "Confirmación", "Seguro desea eliminar esta entidad?", buttons);

        }

        function _doRemove() {
            var fnKey = keyP + "_doRemove";
            blockSrv.block();
            ownedEntitySrv.remove(vm.id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        navigationSrv.goTo(ROUTE.OWNED_ENTITY);
                    }
                    blockSrv.unBlock();
                }
            )
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.OWNED_ENTITY);
        }

        function fnEdit() {
            navigationSrv.goTo(ROUTE.OWNED_ENTITY_EDIT, ROUTE.OWNED_ENTITY_EDIT_PL, vm.id);
        }

    };

    angular.module('rrms')
        .controller('ownedEntityViewCtrl', ['ROUTE', 'indexSrv', 'ownedEntitySrv', 'navigationSrv', 'notificationSrv', 'systemSrv',
            'blockSrv', 'sessionSrv', 'dialogSrv', f]);

})();