/**
 * Created by Asiel on 01/24/2016.
 */

'use strict';

(function () {

    var f = function (indexSrv, systemSrv, ownedEntitySrv, navigationSrv, paginationSrv, ROUTE, searchSrv, blockSrv,
                      sessionSrv) {
        var vm = this;
        const keyP = 'OWNED_ENTITY_LIST';

        vm.wizard = {
            entities: {
                all: []
            },
            init: fnInit,

            changePage: fnChangePage,
            search: fnSearch,
            view: fnView,
            remove: fnRemove,
            new: fnNew,
            edit: fnEdit
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Casas';
            paginationSrv.resetPagination();
            vm.wizard.search();
        }

        function fnSearch() {
            vm.wizard.entities.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();

            var fnKey = keyP + "fnSearch";
            var u = sessionSrv.currentUser();
            blockSrv.setIsLoading(vm.wizard.entities, true);

            ownedEntitySrv.search(u ? u.id : 0, offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    blockSrv.setIsLoading(vm.wizard.entities);
                    if (e) {
                        paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                        var it = systemSrv.getItems(fnKey);
                        if (it) {
                            vm.wizard.entities.all = it;
                        }
                    }
                }
            )

        }

        function fnEdit(id) {
            navigationSrv.goTo(ROUTE.ROLE_EDIT, ROUTE.ROLE_EDIT_PL, id);
        }

        function fnView(id) {
            navigationSrv.goTo(ROUTE.ROLE_VIEW, ROUTE.ROLE_VIEW_PL, id);
        }

        function fnNew() {
            navigationSrv.goTo(ROUTE.ROLE_NEW);
        }

        function fnRemove(id) {
            var fnKey = keyP + "fnRemove";
            roleSrv.remove(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        var idx = searchSrv.indexOf(vm.wizard.entities.all, 'id', id);
                        if (idx !== -1) {
                            vm.wizard.entities.all.splice(idx,1);
                            fnSearch();
                        }
                    }
                }
            )
        }

        function fnUndoRemove() {

        }

        function fnChangePage(newPageNumber) {
            paginationSrv.moveTo(newPageNumber);
            vm.wizard.search();
        }

    };

    f.$inject = ['indexSrv', 'systemSrv', 'ownedEntitySrv', 'navigationSrv', 'paginationSrv', 'ROUTE', 'searchSrv',
        'blockSrv', 'sessionSrv'];

    angular.module('rrms')
        .controller('ownedEntityListCtrl', f);

})();