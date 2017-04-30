/**
 * Created by Asiel on 01/24/2016.
 */

(function () {

    'use strict';

    var f = function (indexSrv, systemSrv, ownedEntitySrv, navigationSrv, paginationSrv, ROUTE, searchSrv, blockSrv,
                      sessionSrv, dialogSrv) {
        var vm = this;
        const keyP = 'OWNED_ENTITY_LIST';

        vm.wizard = {
            entities: {
                all: []
            },
            init: fnInit,

            changePage: fnChangePage,
            search: fnSearch,
            searchAll: fnSearchAll,
            view: fnView,
            remove: fnRemove,
            new: fnNew,
            edit: fnEdit,

            searchByPageChange: fnSearchByPageChange
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Owned Entity';
            paginationSrv.resetPagination();
        }

        function fnSearch(changeFlag) {
            if (changeFlag) {
                ownedEntitySrv.sessionData.allEntities = false;
                paginationSrv.resetPagination();
            }
            if(ownedEntitySrv.sessionData.allEntities){
                fnSearchAll();
            }
            else {
                blockSrv.setIsLoading(vm.wizard.entities, true);
                vm.wizard.entities.all = [];
                var offset = paginationSrv.getOffset();
                var max = paginationSrv.getItemsPerPage();

                var fnKey = keyP + "fnSearch";
                var u = sessionSrv.currentUser();

                ownedEntitySrv.search(u ? u.id : 0, offset, max).then(
                    function (data) {
                        var e = systemSrv.eval(data, fnKey, false, true);
                        blockSrv.setIsLoading(vm.wizard.entities);
                        if (e) {
                            paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                            var it = systemSrv.getItems(fnKey);
                            if (it) {
                                vm.wizard.entities.all = it;
                                vm.wizard.entities.allLoaded = false;
                            }
                        }
                    }
                )
            }
        }

        function fnSearchAll(changeFlag) {
            if (changeFlag) {
                ownedEntitySrv.sessionData.allEntities = true;
                paginationSrv.resetPagination();
            }
            if(!ownedEntitySrv.sessionData.allEntities){
                fnSearch();
            }
            else {
                blockSrv.setIsLoading(vm.wizard.entities, true);

                vm.wizard.entities.all = [];
                var offset = paginationSrv.getOffset();
                var max = paginationSrv.getItemsPerPage();
                var fnKey = keyP + "fnSearchAll";

                ownedEntitySrv.searchAll(offset, max).then(
                    function (data) {
                        var r = systemSrv.eval(data, fnKey, false, true);
                        if (r) {
                            paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                            vm.wizard.entities.all = systemSrv.getItems(fnKey);
                            vm.wizard.entities.allLoaded = true;
                        }
                        blockSrv.setIsLoading(vm.wizard.entities);
                    }
                );

            }
        }

        function fnEdit(id) {
            navigationSrv.goTo(ROUTE.OWNED_ENTITY_EDIT, ROUTE.OWNED_ENTITY_EDIT_PL, id);
        }

        function fnView(id) {
            navigationSrv.goTo(ROUTE.OWNED_ENTITY_VIEW, ROUTE.OWNED_ENTITY_VIEW_PL, id);
        }

        function fnNew() {
            navigationSrv.goTo(ROUTE.OWNED_ENTITY_NEW);
        }

        function fnRemove(id) {
            if (typeof id !== 'undefined' && id !== null) {
                vm.idToRemove = id;
                var buttons = [{text:"Borrar", function: _doRemove, primary: true}];
                dialogSrv.showDialog("Confirmación", "Seguro desea eliminar esta entidad?", buttons);
            }
        }

        function _doRemove() {
            blockSrv.block();
            var fnKey = keyP + "_doRemove";
            ownedEntitySrv.remove(vm.idToRemove).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        var idx = searchSrv.indexOf(vm.wizard.entities.all, 'id', vm.idToRemove);
                        if (idx !== -1) {
                            fnChangePage();
                            delete vm.idToRemove;
                        }
                    }
                    blockSrv.unBlock();
                }
            )
        }

        function fnUndoRemove() {

        }

        function fnChangePage(newPageNumber) {
            paginationSrv.moveTo(newPageNumber);
            vm.wizard.search();
        }

        function fnSearchByPageChange() {
            vm.wizard.entities.allLoaded? fnSearchAll() : fnSearch();
        }

    };

    angular.module('rrms')
        .controller('ownedEntityListCtrl', ['indexSrv', 'systemSrv', 'ownedEntitySrv', 'navigationSrv', 'paginationSrv',
            'ROUTE', 'searchSrv', 'blockSrv', 'sessionSrv', 'dialogSrv', f]);

})();