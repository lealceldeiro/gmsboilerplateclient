/**
 * Created by Asiel on 11/6/2016.
 */

(function() {

    'use strict';

    var routing = function ($routeProvider, ROUTE, $locationProvider, __env) {

        if (window.history && history.pushState) { $locationProvider.html5Mode(true); }
        else { __env.supportHtml5 = false; }

        $routeProvider

            //region error
            .when(ROUTE.CONFIG_ERROR,{
                    templateUrl: 'client/app/modules/_error/envConfigError.html',
                    controller: 'errorCtrl',
                    controllerAs: 'vm'
                }
            )
            //endregion

            //region login
            .when(ROUTE.LOGIN,{
                    templateUrl: 'client/app/modules/account/_login/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'vm'
                }
            )
            .when(ROUTE.MAIN,{
                    templateUrl: 'client/app/modules/main/main.html',
                    controller: 'mainCtrl',
                    controllerAs: 'vm',
                    secured: {
                    }
                }
            )
            //endregion

            //region roles
            .when(ROUTE.ROLES,{
                    templateUrl: 'client/app/modules/account/role/list/role.list.html',
                    controller: 'roleListCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.READ_ROLE]
                    }
                }
            )
            .when(ROUTE.ROLE_EDIT,{
                    templateUrl: 'client/app/modules/account/role/edit/role.edit.html',
                    controller: 'roleEditCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.UPDATE_ROLE]
                    }
                }
            )
            .when(ROUTE.ROLE_NEW,{
                    templateUrl: 'client/app/modules/account/role/edit/role.edit.html',
                    controller: 'roleEditCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.CREATE_ROLE]
                    }
                }
            )
            .when(ROUTE.ROLE_VIEW,{
                    templateUrl: 'client/app/modules/account/role/view/role.view.html',
                    controller: 'roleViewCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.READ_ROLE]
                    }
                }
            )
            //endregion

            //region users
            .when(ROUTE.USERS,{
                    templateUrl: 'client/app/modules/account/user/list/user.list.html',
                    controller: 'userListCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [],
                        requiresAny: [__env.permissions.READ_USER, __env.permissions.READ_ALL_USER]
                    }
                }
            )
            .when(ROUTE.USER_EDIT,{
                    templateUrl: 'client/app/modules/account/user/edit/user.edit.html',
                    controller: 'userEditCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.UPDATE_USER]
                    }
                }
            )
            .when(ROUTE.USER_NEW,{
                    templateUrl: 'client/app/modules/account/user/edit/user.edit.html',
                    controller: 'userEditCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.CREATE_USER]
                    }
                }
            )
            .when(ROUTE.USER_VIEW,{
                    templateUrl: 'client/app/modules/account/user/view/user.view.html',
                    controller: 'userViewCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.READ_USER]
                    }
                }
            )
            //endregion

            //region owned-entity
            .when(ROUTE.OWNED_ENTITY,{
                    templateUrl: 'client/app/modules/owned.entity/list/owned.entity.list.html',
                    controller: 'ownedEntityListCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [],
                        requiresAny: [__env.permissions.READ_OWNED_ENTITY, __env.permissions.READ_ALL_OWNED_ENTITY]
                    }
                }
            )
            .when(ROUTE.OWNED_ENTITY_EDIT,{
                    templateUrl: 'client/app/modules/owned.entity/edit/owned.entity.edit.html',
                    controller: 'ownedEntityEditCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.UPDATE_OWNED_ENTITY]
                    }
                }
            )
            .when(ROUTE.OWNED_ENTITY_NEW,{
                    templateUrl: 'client/app/modules/owned.entity/edit/owned.entity.edit.html',
                    controller: 'ownedEntityEditCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.CREATE_OWNED_ENTITY]
                    }
                }
            )
            .when(ROUTE.OWNED_ENTITY_VIEW,{
                    templateUrl: 'client/app/modules/owned.entity/view/owned.entity.view.html',
                    controller: 'ownedEntityViewCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.READ_OWNED_ENTITY]
                    }
                }
            )
            //endregion

            //region permissions
            .when(ROUTE.PERMISSIONS,{
                    templateUrl: 'client/app/modules/account/permission/list/permission.list.html',
                    controller: 'permissionCtrl',
                    controllerAs: 'vm',
                    secured: {
                        requiresAll: [__env.permissions.READ_PERMISSION]
                    }
                }
            )
            //endregion

            //region config
            .when(ROUTE.CONFIG_PARAMS,{
                templateUrl: 'client/app/modules/config/params.html',
                controller: 'configParamsCtrl',
                controllerAs: 'vm',
                secured: {
                    requiresAll: [__env.permissions.MANAGE_CONFIGURATION]
                }
            })
            //endregion

            //otherwise
            .otherwise(
                {
                    redirectTo: ROUTE.MAIN
                }
            )
    };

    angular.module('rrms')
        .config(['$routeProvider', 'ROUTE', '$locationProvider', '__env', routing]);

})();