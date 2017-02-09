/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function() {

    angular.module('rrms')
        .constant(
            'ROUTE', {
                CONFIG_ERROR: '/configuration-error',
                LOGIN: '/login',
                MAIN: '/main',

                ROLES: '/roles',
                ROLE_EDIT: '/roles/:id/edit', ROLE_EDIT_PL: ':id',
                ROLE_NEW: '/roles/new',
                ROLE_VIEW: '/roles/:id/view', ROLE_VIEW_PL: ':id',

                USERS: '/usuarios',
                USER_EDIT: '/usuarios/:id/edit', USER_EDIT_PL: ':id',
                USER_NEW: '/usuarios/new',
                USER_VIEW: '/usuarios/:id/view', USER_VIEW_PL: ':id',

                HOUSES: '/casas',

                LOCATIONS: '/ubicaciones',

                RESERVATIONS: '/reservaciones',

                PERMISSIONS: '/permisos'
            }
        )
})();