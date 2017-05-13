/**
 * Created by Asiel on 11/6/2016.
 */

(function() {

    'use strict';

    angular.module('rrms')
        .constant(
            'ROUTE', {
                CONFIG_ERROR: '/configuration-error',
                LOGIN: '/admin/login',
                MAIN: '/admin/main',

                ROLES: '/admin/roles',
                ROLE_EDIT: '/admin/roles/:id/edit', ROLE_EDIT_PL: ':id',
                ROLE_NEW: '/admin/roles/new',
                ROLE_VIEW: '/admin/roles/:id/view', ROLE_VIEW_PL: ':id',

                USERS: '/admin/users',
                USER_EDIT: '/admin/users/:id/edit', USER_EDIT_PL: ':id',
                USER_NEW: '/admin/users/new',
                USER_VIEW: '/admin/users/:id/view', USER_VIEW_PL: ':id',

                OWNED_ENTITY: '/admin/owned-entities',
                OWNED_ENTITY_EDIT: '/admin/owned-entities/:id/edit', OWNED_ENTITY_EDIT_PL: ':id',
                OWNED_ENTITY_NEW: '/admin/owned-entities/new',
                OWNED_ENTITY_VIEW: '/admin/owned-entities/:id/view', OWNED_ENTITY_VIEW_PL: ':id',

                PERMISSIONS: '/admin/permissions',

                CONFIG_PARAMS: '/admin/config/params'
            }
        )
        .constant(
            'BROADCAST',
            {
                auth: {
                    REFRESH_TOKEN: 'REFRESH_TOKEN',
                    UNAUTHORIZED_BACKWARD: 'UNAUTHORIZED_BACKWARD'

                },
                modal: {
                    SHOW_DIALOG_TAB: 'SHOW_DIALOG_TAB',
                    SHOW_DIALOG: 'SHOW_DIALOG'
                },
                pagination: {
                    RESET_PAGINATION: "RESET_PAGINATION"
                },
                component:{
                    toolbar: {
                        OPEN: 'toolbar.OPEN',
                        CLOSE: 'toolbar.CLOSE'
                    },
                    toast:{
                        OPEN: 'toast.OPEN',
                        CLOSE: 'toast.CLOSE'
                    }
                }
            }
        )
})();