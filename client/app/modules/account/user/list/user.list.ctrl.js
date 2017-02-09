/**
 * Created by Asiel on 12/22/2016.
 */

'use strict';

(function () {

    var f = function (indexSrv, systemSrv, userSrv, navigationSrv, paginationSrv, ROUTE, searchSrv, blockSrv, sessionSrv,
                      $rootScope) {
        var vm = this;
        const keyP = 'USER_LIST';

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
            indexSrv.siteTile = 'Usuarios';
            paginationSrv.resetPagination();
            vm.wizard.search();
        }

        function fnSearch() {
            blockSrv.setIsLoading(vm.wizard.entities, true);

            vm.wizard.entities.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();
            var fnKey = keyP + "fnSearch";
            var ent = sessionSrv.loginEntity();

            userSrv.search(ent ? ent.id : 0, offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    blockSrv.setIsLoading(vm.wizard.entities);
                    if (e) {
                        paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                        vm.wizard.entities.all = systemSrv.getItems(fnKey);
                        vm.wizard.entities.allLoaded = false;
                    }
                }
            );
        }

        function fnSearchAll() {
            blockSrv.setIsLoading(vm.wizard.entities, true);

            vm.wizard.entities.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();
            var fnKey = keyP + "fnSearchAll";

            userSrv.searchAll(offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    blockSrv.setIsLoading(vm.wizard.entities);
                    if (e) {
                        paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                        vm.wizard.entities.all = systemSrv.getItems(fnKey);
                        vm.wizard.entities.allLoaded = true;
                    }
                }
            );
        }

        function fnEdit(id) {
            navigationSrv.goTo(ROUTE.USER_EDIT, ROUTE.USER_EDIT_PL, id);
        }

        function fnView(id) {
            navigationSrv.goTo(ROUTE.USER_VIEW, ROUTE.USER_VIEW_PL, id);
        }

        function fnNew() {
            navigationSrv.goTo(ROUTE.USER_NEW);
        }

        function fnRemove(id) {
            blockSrv.block();
            var fnKey = keyP + "fnRemove";
            userSrv.remove(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        var idx = searchSrv.indexOf(vm.wizard.entities.all, 'id', id);
                        if (idx !== -1) {
                            var us = sessionSrv.currentUser();
                            if (us && us.id == id) { //current user?
                                sessionSrv.clearSession();

                                //update users's logged in/out status
                                $rootScope.$broadcast('TRIGGER_ACTION_AUTH');

                                navigationSrv.goTo(ROUTE.LOGIN);
                            }
                            else {
                                fnSearchByPageChange();
                            }
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
            vm.wizard.entities.allLoaded? fnSearchAll() : fnSearch();
        }

    };

    f.$inject = ['indexSrv', 'systemSrv', 'userSrv', 'navigationSrv', 'paginationSrv', 'ROUTE', 'searchSrv', 'blockSrv',
        'sessionSrv', '$rootScope'];

    angular.module('rrms')
        .controller('userListCtrl', f);

})();