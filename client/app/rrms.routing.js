/**
 * Created by Asiel on 11/6/2016.
 */

(function() {

    'use strict';

    var routing = function ($routeProvider, ROUTE) {

        $routeProvider

            //region error
            .when(ROUTE.CONFIG_ERROR,{
                    templateUrl: '_common/html/views/envConfigError.html'
                }
            )
            //endregion

            //region login
            .when(ROUTE.LOGIN,{
                    templateUrl: 'account/_login/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.MAIN,{
                    templateUrl: 'main/main.html',
                    controller: 'mainCtrl',
                    controllerAs: 'vm'
                }
            )
            //endregion

            //region roles
            .when(ROUTE.ROLES,{
                    templateUrl: 'account/role/list/role.list.html',
                    controller: 'roleListCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.ROLE_EDIT,{
                    templateUrl: 'account/role/edit/role.edit.html',
                    controller: 'roleEditCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.ROLE_NEW,{
                    templateUrl: 'account/role/edit/role.edit.html',
                    controller: 'roleEditCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.ROLE_VIEW,{
                    templateUrl: 'account/role/view/role.view.html',
                    controller: 'roleViewCtrl',
                    controllerAs: 'vm'
                }
            )
            //endregion

            //region users
            .when(ROUTE.USERS,{
                    templateUrl: 'account/user/list/user.list.html',
                    controller: 'userListCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.USER_EDIT,{
                    templateUrl: 'account/user/edit/user.edit.html',
                    controller: 'userEditCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.USER_NEW,{
                    templateUrl: 'account/user/edit/user.edit.html',
                    controller: 'userEditCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.USER_VIEW,{
                    templateUrl: 'account/user/view/user.view.html',
                    controller: 'userViewCtrl',
                    controllerAs: 'vm'
                }
            )
            //endregion

            //region owned-entity
            .when(ROUTE.OWNED_ENTITY,{
                    templateUrl: 'owned.entity/list/owned.entity.list.html',
                    controller: 'ownedEntityListCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.OWNED_ENTITY_EDIT,{
                    templateUrl: 'owned.entity/edit/owned.entity.edit.html',
                    controller: 'ownedEntityEditCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.OWNED_ENTITY_NEW,{
                    templateUrl: 'owned.entity/edit/owned.entity.edit.html',
                    controller: 'ownedEntityEditCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.OWNED_ENTITY_VIEW,{
                    templateUrl: 'owned.entity/view/owned.entity.view.html',
                    controller: 'ownedEntityViewCtrl',
                    controllerAs: 'vm'
                }
            )
            //endregion

            //region permissions
            .when(ROUTE.PERMISSIONS,{
                    templateUrl: 'account/permission/list/permission.list.html',
                    controller: 'permissionCtrl',
                    controllerAs: 'vm'
                }
            )
            //endregion

            //otherwise
            .otherwise(
                {
                    redirectTo: ROUTE.MAIN
                }
            )
    };

    routing.$inject = ['$routeProvider', 'ROUTE'];

    angular.module('rrms')
        .config(['$routeProvider', 'ROUTE', routing]);

})();