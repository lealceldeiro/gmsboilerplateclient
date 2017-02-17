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

                USERS: '/users',
                USER_EDIT: '/users/:id/edit', USER_EDIT_PL: ':id',
                USER_NEW: '/users/new',
                USER_VIEW: '/users/:id/view', USER_VIEW_PL: ':id',

                OWNED_ENTITY: '/owned-entities',

                LOCATIONS: '/locations',

                RESERVATIONS: '/reservations',

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
                    SHOW_DIALOG_TAB: 'SHOW_DIALOG_TAB'
                },
                pagination: {
                    RESET_PAGINATION: "RESET_PAGINATION"
                },
                component:{
                    toolbar: {
                        show: 'show.TOOLBAR',
                        hide: 'hide.TOOLBAR'
                    }
                },
                toast:{
                    OPEN: 'toast.OPEN',
                    CLOSE: 'toast.CLOSE'
                }
            }
        )
})();