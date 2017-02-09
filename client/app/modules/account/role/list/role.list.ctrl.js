/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleListCtrl = function (indexSrv, systemSrv, roleSrv, navigationSrv, paginationSrv, ROUTE, searchSrv, blockSrv,
                                 sessionSrv) {
        var vm = this;
        const keyP = 'ROLE_LIST';

        vm.wizard = {
            roles: {
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
            indexSrv.siteTile = 'Roles';
            paginationSrv.resetPagination();
            vm.wizard.search();
        }

        function fnSearch() {
            blockSrv.setIsLoading(vm.wizard.roles, true);
            vm.wizard.roles.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();
            var ent = sessionSrv.loginEntity();
            var u = sessionSrv.currentUser();

            var fnKey = keyP + "fnSearch";
            roleSrv.search(u ? u.id : 0, ent ? ent.id : 0, offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    blockSrv.setIsLoading(vm.wizard.roles);
                    if (e) {
                        paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                        vm.wizard.roles.all = systemSrv.getItems(fnKey);
                        vm.wizard.roles.allLoaded = false;
                    }
                }
            )

        }

        function fnSearchAll() {
            blockSrv.setIsLoading(vm.wizard.roles, true);

            vm.wizard.roles.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();
            var fnKey = keyP + "fnSearchAll";

            roleSrv.searchAll(offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    blockSrv.setIsLoading(vm.wizard.roles);
                    if (e) {
                        paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                        vm.wizard.roles.all = systemSrv.getItems(fnKey);
                        vm.wizard.roles.allLoaded = true;
                    }
                }
            );
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
            blockSrv.block();
            roleSrv.remove(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        var idx = searchSrv.indexOf(vm.wizard.roles.all, 'id', id);
                        if (idx !== -1) {
                            vm.wizard.roles.all.splice(idx,1);
                            fnSearchByPageChange();
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
            fnSearchByPageChange();
        }


        function fnSearchByPageChange() {
            vm.wizard.roles.allLoaded? fnSearchAll() : fnSearch();
        }

    };

    roleListCtrl.$inject = ['indexSrv', 'systemSrv', 'roleSrv', 'navigationSrv', 'paginationSrv', 'ROUTE', 'searchSrv',
        'blockSrv', 'sessionSrv'];

    angular.module('rrms')
        .controller('roleListCtrl', roleListCtrl);

})();