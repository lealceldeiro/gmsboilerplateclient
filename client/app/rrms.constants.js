/**
 * Created by Asiel on 11/6/2016.
 */

(function() {

    'use strict';

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

                USERS: '/users',
                USER_EDIT: '/users/:id/edit', USER_EDIT_PL: ':id',
                USER_NEW: '/users/new',
                USER_VIEW: '/users/:id/view', USER_VIEW_PL: ':id',

                OWNED_ENTITY: '/owned-entities',
                OWNED_ENTITY_EDIT: '/owned-entities/:id/edit', OWNED_ENTITY_EDIT_PL: ':id',
                OWNED_ENTITY_NEW: '/owned-entities/new',
                OWNED_ENTITY_VIEW: '/owned-entities/:id/view', OWNED_ENTITY_VIEW_PL: ':id',

                PERMISSIONS: '/permissions'
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