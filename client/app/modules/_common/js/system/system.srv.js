/**
 * Created by Asiel on 11/17/2016.
 */
(
    function () {
        'use strict';

        var systemSrv = function (__env, notificationSrv) {
            var self = this;

            //region configVars
            var a = __env.api['base_url_req'];
            var b = __env.api['api_relative_url_req'];
            var c = __env.api['success_resp'];
            var d = __env.api['error_message_resp'];
            var e = __env.api['success_message_resp'];
            var f = __env.api['total_count_resp'];
            var g = __env.api['items_resp'];
            var h = __env.api['item_resp'];
            var i = __env.api['header_auth_token_req'];
            var j = __env.api['header_un_auth_token_req'];
            var k = __env.api['header_auth_bearer_req'];
            var l = __env.api['item_token_resp'];
            var m = __env.api['item_refresh_token_req_resp'];
            var n = __env.api['auth_new_token_requester_req'];
            var o = __env.api['auth_login_user_req'];
            var p = __env.api['auth_login_password_req'];
            var q = __env.api['auth_user_resp'];
            var r = __env.api['auth_permissions_resp'];
            var s = __env.api['unauthorized_code_resp'];
            //endregion

            self.service = {
                //regions PERMISSIONS
                grant: {
                    MANAGE_USER:            __env.permissions.MANAGE_USER           || "MANAGE__USER",
                    CREATE_USER:            __env.permissions.CREATE_USER           || "CREATE__USER",
                    READ_USER:              __env.permissions.READ_USER             || "READ__USER",
                    READ_ALL_USER:          __env.permissions.READ_ALL_USER         || "READ__USER",
                    READ_ASSOCIATED_USER:   __env.permissions.READ_ASSOCIATED_USER  || "READ_ASSOCIATED__USER",
                    UPDATE_USER:            __env.permissions.UPDATE_USER           || "UPDATE__USER",
                    DELETE_USER:            __env.permissions.DELETE_USER           || "DELETE__USER",

                    MANAGE_ROLE:            __env.permissions.MANAGE_ROLE           || "MANAGE__ROLE",
                    CREATE_ROLE:            __env.permissions.CREATE_ROLE           || "CREATE__ROLE",
                    READ_ROLE:              __env.permissions.READ_ROLE             || "READ__ROLE",
                    UPDATE_ROLE:            __env.permissions.UPDATE_ROLE           || "UPDATE__ROLE",
                    DELETE_ROLE:            __env.permissions.DELETE_ROLE           || "DELETE__ROLE",

                    MANAGE_PERMISSION:      __env.permissions.MANAGE_PERMISSION     || "MANAGE__PERMISSION",
                    CREATE_PERMISSION:      __env.permissions.CREATE_PERMISSION     || "CREATE__PERMISSION",
                    READ_PERMISSION:        __env.permissions.READ_PERMISSION       || "READ__PERMISSION",
                    UPDATE_PERMISSION:      __env.permissions.UPDATE_PERMISSION     || "UPDATE__PERMISSION",
                    DELETE_PERMISSION:      __env.permissions.DELETE_PERMISSION     || "DELETE__PERMISSION",

                    MANAGE_OWNED_ENTITY:    __env.permissions.MANAGE_OWNED_ENTITY   || "MANAGE__OWNED_ENTITY",
                    CREATE_OWNED_ENTITY:    __env.permissions.CREATE_OWNED_ENTITY   || "CREATE__OWNED_ENTITY",
                    READ_OWNED_ENTITY:      __env.permissions.READ_OWNED_ENTITY     || "READ__OWNED_ENTITY",
                    READ_ALL_OWNED_ENTITY:  __env.permissions.READ_ALL_OWNED_ENTITY || "READ_ALL__OWNED_ENTITY",
                    UPDATE_OWNED_ENTITY:    __env.permissions.UPDATE_OWNED_ENTITY   || "UPDATE__OWNED_ENTITY",
                    DELETE_OWNED_ENTITY:    __env.permissions.DELETE_OWNED_ENTITY   || "DELETE__OWNED_ENTITY",

                    MANAGE_PROFILE:         __env.permissions.MANAGE_PROFILE        || "MANAGE__PROFILE",
                    READ_PROFILE:           __env.permissions.READ_PROFILE          || "READ__PROFILE"
                },
                //endregion

                //region configVars
                base_url_req:                   (a !== '<base_url>')                        ? a || 'http://127.0.0.1/gmsboilerplate'   : 'http://127.0.0.1/gmsboilerplate',
                api_relative_url_req:           (b !== '<relative_url>')                    ? b || '/api/'              : '/api/',
                header_auth_token_req:          (i !== '<header_auth_token>')               ? i || 'Authorization'      : 'Authorization',
                header_un_auth_token_req:       (j !== '<header_unAuth>')                   ? j || 'X-Auth-Token'       : 'X-Auth-Token',
                header_auth_bearer_req:         (k !== '<header_auth_bearer>')              ? k                         : 'Bearer', //important the space at the end of the text
                auth_new_token_requester_req:   (n !== '<auth_new_token_requester>')        ? n || 'grant_type'         : 'grant_type',
                auth_login_user_req:            (o !== '<auth_login_user>')                 ? o || 'usrnm'              : 'usrnm',
                auth_login_password_req:        (p !== '<auth_login_password>')             ? p || 'pswrd'              : 'pswrd',

                item_refresh_token_req_resp:    (m !== '<item_refresh_token>')              ? m || 'refresh_token'      : 'refresh_token',

                success_resp:                   (c !== '<success>')                         ? c || 'success'             : 'success',
                error_message_resp:             (d !== '<error_message>')                   ? d || 'errorMessage'       : 'errorMessage',
                success_message_resp:           (e !== '<success_message>')                 ? e || 'successMessage'     : 'successMessage',
                total_count_resp:               (f !== '<total_count>')                     ? f || 'total'              : 'total',
                items_resp:                     (g !== '<items>')                           ? g || 'items'              : 'items',
                item_resp:                      (h !== '<item>')                            ? h || 'item'               : 'item',
                item_token_resp:                (l !== '<item_token>')                      ? l || 'access_token'       : 'access_token',
                auth_user_resp:                 (q !== '<auth_user_response>')              ? q || 'username'           : 'username',
                auth_permissions_resp:          (r !== '<auth_permissions>')                ? r || 'permissions'        : 'permissions',
                unauthorized_code_resp:         (s !== '<unauthorized_response_code_flag>') ? s || 401                  : 401,
                //endregion

                // accessible from outside, but not recommended to do so, internal service usage
                apiMessage: {},
                apiTotalCount: {},
                apiItems: {},
                apiItem: {},
                userAuthResponse: {},
                itemToken: {},
                itemRefreshToken: {},


                eval: fnEvaluateResponseData,
                evalAuth: fnEvaluateAuthenticationData,

                getMessage: fnGetMessage,
                getTotal: fnGetTotalCount,
                getItems: fnGetItems,
                getItem: fnGetItem,

                getAuthToken: fnGetAuthToken,
                getAuthRefreshToken: fnGetAuthRefreshToken,
                getAuthUser: fnGetAuthUser,
                getAuthPermissions: fnGetAuthUser,
                gtAuthPermissions: fnGetAuthPermissions
            };

            self.service.APIAbsoluteUrl = self.service.base_url_req + self.service.api_relative_url_req;

            return self.service;

            /**
             * Evaluates a data from a server response and indicates whether the server said the operation was successful
             * or not. By successful or not it is excluded server errors, denies, etc (500, 401, 403, and so on). By
             * successful or not it is said if, for instance, there was not business rules violated and the operations
             * finished properly.
             * @param data data to be evaluated
             * @param storeKey key under which the data will be store
             * @param notifyOnSuccess Whether a notification should be shown or not on success result
             * @param notifyOnUnSuccess Whether a notification should be shown or not on non-success result
             * @param successCallback A callback to be shown in the notification as an action to be taken by the user if
             * the result is successful
             * @param successCallbackText A text for callback to be shown in the notification as an action to be taken
             * by the user if the result is successful
             * @param unSuccessCallback A callback to be shown in the notification as an action to be taken by the user if
             * the result is unsuccessful
             * @param unSuccessCallbackText A text for callback to be shown in the notification as an action to be taken
             * by the user if the result is unsuccessful
             * @returns {boolean} true if success, false otherwise
             */
            function fnEvaluateResponseData(data, storeKey, notifyOnSuccess, notifyOnUnSuccess, successCallback,
                                            successCallbackText, unSuccessCallback, unSuccessCallbackText) {
                validate(storeKey);
                if (data) {
                    if (data[self.service.success_resp]) {
                        self.service.apiMessage[storeKey] = data[self.service.success_message_resp]
                            || notificationSrv.utilText.successful_operation;
                        self.service.apiTotalCount[storeKey] = data[self.service.total_count_resp];
                        self.service.apiItems[storeKey] = data[self.service.items_resp];
                        self.service.apiItem[storeKey] = data[self.service.item_resp];
                        if (notifyOnSuccess) {
                            notificationSrv.showNotification(notificationSrv.type.SUCCESS, self.service.apiMessage[storeKey],
                                successCallback ? [successCallback] : [], successCallbackText ? [successCallbackText] : []);
                        }

                        return true
                    }
                    else {
                        self.service.apiMessage[storeKey] = data[self.service.error_message_resp] ||
                            notificationSrv.utilText.unsuccessful_operation;

                        if (notifyOnUnSuccess && !notificationSrv.mutedNotifications) {
                            notificationSrv.showNotification(notificationSrv.type.ERROR, self.service.apiMessage[storeKey],
                                unSuccessCallback ? [unSuccessCallback] : [], unSuccessCallbackText ? [unSuccessCallbackText] : []);
                        }

                        return false
                    }
                }
                self.service.apiMessage[storeKey] = 'There was not data provided for request with key "' + storeKey + '"';
                if (notifyOnUnSuccess && !notificationSrv.mutedNotifications) {
                    notificationSrv.showNotification(notificationSrv.type.ERROR, self.service.apiMessage[storeKey],
                        unSuccessCallback ? [unSuccessCallback] : [], unSuccessCallbackText ? [unSuccessCallbackText] : []);
                }
                return false
            }

            /**
             * Evaluates a data from a server response on "login action" and indicates whether the server said the
             * operation was successful or not. By successful or not it is excluded server errors, denies,
             * etc (500, 401, 403, and so on). By
             * successful or not it is said if, for instance, there was not business rules violated and the operations
             * finished properly.
             * @param data data to be evaluated
             * @param storeKey key under which the data will be store
             * @param notifyOnSuccess Whether a notification should be shown or not on success result
             * @param notifyOnUnSuccess Whether a notification should be shown or not on non-success result
             * @param successCallback A callback to be shown in the notification as an action to be taken by the user if
             * the result is successful
             * @param successCallbackText A text for callback to be shown in the notification as an action to be taken
             * by the user if the result is successful
             * @param unSuccessCallback A callback to be shown in the notification as an action to be taken by the user if
             * the result is unsuccessful
             * @param unSuccessCallbackText A text for callback to be shown in the notification as an action to be taken
             * by the user if the result is unsuccessful
             * @returns {boolean} true if success, false otherwise
             */
            function fnEvaluateAuthenticationData(data, storeKey, notifyOnSuccess, notifyOnUnSuccess, successCallback, successCallbackText,
                                                  unSuccessCallback, unSuccessCallbackText) {
                if (data) {
                    if (data[self.service.item_token_resp]) {
                        self.service.userAuthResponse = data[self.service.auth_user_resp];
                        self.service.itemToken = data[self.service.item_token_resp];
                        self.service.itemRefreshToken = data[self.service.item_refresh_token_req_resp];
                        self.service.authPermissions = data[self.service.auth_permissions_resp];
                        if (notifyOnSuccess) {
                            notificationSrv.showNotification(notificationSrv.type.SUCCESS, notificationSrv.utilText.success_label + ": " +
                                self.service.apiMessage[storeKey], successCallback ? [successCallback] : [],
                                successCallbackText ? [successCallbackText] : []);
                        }

                        return true
                    }
                    else {
                        self.service.apiMessage[storeKey] = data[self.service.error_message_resp] ||
                            notificationSrv.getText(notificationSrv.utilText.unsuccessful_operation);

                        if (notifyOnUnSuccess) {
                            notificationSrv.showNotification(notificationSrv.type.ERROR, notificationSrv.utilText.error_label + ": " +
                                self.service.apiMessage[storeKey], unSuccessCallback ? [unSuccessCallback] : [],
                                unSuccessCallbackText ? [unSuccessCallbackText] : []);
                        }

                        return false
                    }
                }
                self.service.apiMessage[storeKey] = 'There was not data provided for request with key "' + storeKey + '"';
                if (notifyOnUnSuccess && !notificationSrv.mutedNotifications) {
                    notificationSrv.showNotification(notificationSrv.type.ERROR, self.service.apiMessage[storeKey],
                        unSuccessCallback ? [unSuccessCallback] : [], unSuccessCallbackText ? [unSuccessCallbackText] : []);
                }
                return false
            }

            function fnGetMessage(key) {
                validate(key);
                return self.service.apiMessage[key]
            }

            function fnGetTotalCount(key) {
                validate(key);
                return self.service.apiTotalCount[key]
            }

            function fnGetItems(key) {
                validate(key);
                return self.service.apiItems[key]
            }

            function fnGetItem(key) {
                validate(key);
                return self.service.apiItem[key]
            }


            function fnGetAuthUser() {
                return self.service.userAuthResponse
            }

            function fnGetAuthToken() {
                return self.service.itemToken
            }

            function fnGetAuthRefreshToken() {
                return self.service.itemRefreshToken
            }

            function fnGetAuthPermissions() {
                return self.service.authPermissions
            }


            function validate(key) {
                if (typeof key === 'undefined' || key === null) {
                    throw Error('A Key must be provided in order to store the server response')
                }
            }
        };

        angular.module('rrms')
            .service('systemSrv', ['__env', 'notificationSrv', systemSrv]);
    }
)();