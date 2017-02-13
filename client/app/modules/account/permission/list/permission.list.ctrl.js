/**
 * Created by Asiel on 01/20/2017.
 */

'use strict';

(function () {

    var f = function (indexSrv, systemSrv, permissionSrv, paginationSrv, blockSrv) {
        var vm = this;
        const keyP = 'PERMISSIONS_LIST';

        vm.wizard = {
            entities: {
                all: []
            },
            init: fnInit,

            changePage: fnChangePage,
            search: fnSearch,

            searchByPageChange: fnSearchByPageChange
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Permisos';
            paginationSrv.resetPagination();
            vm.wizard.search();
        }

        function fnSearch() {
            vm.wizard.entities.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();

            var fnKey = keyP + "fnSearch";
            blockSrv.setIsLoading(vm.wizard.entities, true);
            permissionSrv.search(offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    blockSrv.setIsLoading(vm.wizard.entities);
                    if (e) {
                        paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                        vm.wizard.entities.all = systemSrv.getItems(fnKey);
                    }
                }
            )

        }

        function fnChangePage(newPageNumber) {
            paginationSrv.moveTo(newPageNumber);
            vm.wizard.search();
        }

        function fnSearchByPageChange() {
            fnSearch();
        }

    };

    f.$inject = ['indexSrv', 'systemSrv', 'permissionSrv', 'paginationSrv',
        'blockSrv'];

    angular.module('rrms')
        .controller('permissionCtrl', f);

})();