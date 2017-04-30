/**
 * Created by Asiel on 12/22/2016.
 */

(function () {

    'use strict';

    var f = function (indexSrv, systemSrv, userSrv, navigationSrv, paginationSrv, ROUTE, searchSrv, blockSrv, sessionSrv,
                      dialogSrv) {
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

            searchByPageChange: fnSearchByPageChange,

            activateDeactivate: fnActivateDeactivate
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Usuarios';
            paginationSrv.resetPagination();
        }

        function fnSearch(changeFlag) {
            if (changeFlag) {
                userSrv.sessionData.allEntities = false;
                paginationSrv.resetPagination();
            }
            if(userSrv.sessionData.allEntities){
                fnSearchAll();
            }
            else {
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
        }

        function fnSearchAll(changeFlag) {
            if (changeFlag) {
                userSrv.sessionData.allEntities = true;
                paginationSrv.resetPagination();
            }
            if(!userSrv.sessionData.allEntities){
                fnSearch();
            }
            else {
                blockSrv.setIsLoading(vm.wizard.entities, true);

                vm.wizard.entities.all = [];
                var offset = paginationSrv.getOffset();
                var max = paginationSrv.getItemsPerPage();
                var fnKey = keyP + "fnSearchAll";

                var p = sessionSrv.getPermissions();
                var def;
                if (p.indexOf(systemSrv.grant.READ_ALL_USER) !== -1) {
                    def = userSrv.searchAll(offset, max)
                }
                else if(p.indexOf(systemSrv.grant.READ_ASSOCIATED_USER) !== -1) {
                    var eidS = [];
                    var es = sessionSrv.currentUser().entities;
                    angular.forEach(es, function (e) {
                        eidS.push(e['id']);
                    });
                    def = userSrv.searchAllFromEntities(eidS, offset, max);
                }
                else { blockSrv.setIsLoading(vm.wizard.entities); }

                def.then(
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
            navigationSrv.goTo(ROUTE.USER_EDIT, ROUTE.USER_EDIT_PL, id);
        }

        function fnActivateDeactivate(item) {
            if (item) {
                blockSrv.block();
                var fnKey = keyP + "fnActivateDeactivate";

                userSrv.activate(item.id, item.enabled).then(
                    function (data) {
                        var e = systemSrv.eval(data, fnKey, false, true);
                        blockSrv.unBlock();
                        if (!e) { //if fail, return element to after submission position (md-switch changes model)
                            item.enabled = !item.enabled;
                        }
                    }
                );
            }
            else{
                console.warn("There is no role for that index");
            }
        }

        function fnView(id) {
            navigationSrv.goTo(ROUTE.USER_VIEW, ROUTE.USER_VIEW_PL, id);
        }

        function fnNew() {
            navigationSrv.goTo(ROUTE.USER_NEW);
        }

        function fnRemove(id) {
            if (typeof id !== 'undefined' && id !== null) {
                vm.idToRemove = id;
                var buttons = [{text:"Borrar", function: _doRemove, primary: true}];
                dialogSrv.showDialog("Confirmación", "Seguro desea eliminar este usuario?", buttons);
            }
        }

        function _doRemove() {
            blockSrv.block();
            var fnKey = keyP + "_doRemove";
            userSrv.remove(vm.idToRemove).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        var idx = searchSrv.indexOf(vm.wizard.entities.all, 'id', vm.idToRemove);
                        if (idx !== -1) {
                            var us = sessionSrv.currentUser();
                            if (us && us.id === vm.idToRemove) { //current user?
                                sessionSrv.logOut();
                                navigationSrv.goTo(ROUTE.LOGIN);
                            }
                            else {
                                fnChangePage();
                                delete vm.idToRemove;
                            }
                        }
                        else{
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
            fnSearchByPageChange();
        }

        function fnSearchByPageChange() {
            vm.wizard.entities.allLoaded? fnSearchAll() : fnSearch();
        }

    };

    angular.module('rrms')
        .controller('userListCtrl', ['indexSrv', 'systemSrv', 'userSrv', 'navigationSrv', 'paginationSrv', 'ROUTE',
            'searchSrv', 'blockSrv', 'sessionSrv', 'dialogSrv', f]);

})();