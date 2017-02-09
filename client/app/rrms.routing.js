/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function() {

    var routing = function ($routeProvider, ROUTE) {

        $routeProvider

            //error
            .when(ROUTE.CONFIG_ERROR,{
                    templateUrl: '_common/html/views/envConfigError.html'
                }
            )

            //login
            .when(ROUTE.LOGIN,{
                    templateUrl: 'account/login/login.html',
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

            //roles
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

            //users
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

            //houses
            .when(ROUTE.OWNED_ENTITY,{
                    templateUrl: 'owned.entity/list/owned.entity.list.html',
                    controller: 'ownedEntityListCtrl',
                    controllerAs: 'vm'
                }
            )
            /*.when(ROUTE.USER_EDIT,{
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
            )*/

            //locations
            .when(ROUTE.LOCATIONS,{
                    templateUrl: 'main/main.html',
                    controller: 'mainCtrl',
                    controllerAs: 'vm'
                }
            )

            //reservations
            .when(ROUTE.RESERVATIONS,{
                    templateUrl: 'main/main.html',
                    controller: 'mainCtrl',
                    controllerAs: 'vm'
                }
            )

            //permissions
            .when(ROUTE.PERMISSIONS,{
                    templateUrl: 'account/permission/list/permission.list.html',
                    controller: 'permissionCtrl',
                    controllerAs: 'vm'
                }
            )

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