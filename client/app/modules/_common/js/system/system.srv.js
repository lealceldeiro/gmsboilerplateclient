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
                    MANAGE_USER:        __env.permissions.MANAGE_USER       || "MANAGE_USER",
                    CREATE_USER:        __env.permissions.CREATE_USER       || "CREATE_USER",
                    READ_USER:          __env.permissions.READ_USER         || "READ_USER",
                    UPDATE_USER:        __env.permissions.UPDATE_USER       || "UPDATE_USER",
                    DELETE_USER:        __env.permissions.DELETE_USER       || "DELETE_USER",

                    MANAGE_ROLE:        __env.permissions.MANAGE_ROLE       || "MANAGE_ROLE",
                    CREATE_ROLE:        __env.permissions.CREATE_ROLE       || "CREATE_ROLE",
                    READ_ROLE:          __env.permissions.READ_ROLE         || "READ_ROLE",
                    UPDATE_ROLE:        __env.permissions.UPDATE_ROLE       || "UPDATE_ROLE",
                    DELETE_ROLE:        __env.permissions.DELETE_ROLE       || "DELETE_ROLE",

                    MANAGE_PERMISSION:  __env.permissions.MANAGE_PERMISSION || "MANAGE_PERMISSION",
                    CREATE_PERMISSION:  __env.permissions.CREATE_PERMISSION || "CREATE_PERMISSION",
                    READ_PERMISSION:    __env.permissions.READ_PERMISSION   || "READ_PERMISSION",
                    UPDATE_PERMISSION:  __env.permissions.UPDATE_PERMISSION || "UPDATE_PERMISSION",
                    DELETE_PERMISSION:  __env.permissions.DELETE_PERMISSION || "DELETE_PERMISSION"
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
             * @param callback A callback to be shown in the notification as an action to be taken by the user
             * @returns {boolean} true if success, false otherwise
             */
            function fnEvaluateResponseData(data, storeKey, notifyOnSuccess, notifyOnUnSuccess, callback) {
                validate(storeKey);
                if (data) {
                    if (data[self.service.success_resp]) {
                        self.service.apiMessage[storeKey] = data[self.service.success_message_resp] || notificationSrv.utilText.successfulOperation.es;
                        self.service.apiTotalCount[storeKey] = data[self.service.total_count_resp];
                        self.service.apiItems[storeKey] = data[self.service.items_resp];
                        self.service.apiItem[storeKey] = data[self.service.item_resp];
                        if (notifyOnSuccess) {
                            notificationSrv.showNotif(self.service.apiMessage[storeKey], notificationSrv.utilText.titleSuccess.es,
                                notificationSrv.type.SUCCESS);
                        }

                        return true
                    }
                    else {
                        self.service.apiMessage[storeKey] = data[self.service.error_message_resp] || notificationSrv.utilText.unSuccessfulOperation.es;

                        if (notifyOnUnSuccess) {
                            notificationSrv.showNotif(self.service.apiMessage[storeKey], notificationSrv.utilText.titleError.es,
                                notificationSrv.type.ERROR);
                        }

                        return false
                    }
                }
                self.service.apiMessage[storeKey] = 'There was not data provided for request with key "' + storeKey + '"';
                if (notifyOnUnSuccess) {
                    notificationSrv.showNotif(self.service.apiMessage[storeKey], notificationSrv.utilText.titleError.es,
                        notificationSrv.type.ERROR);
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
             * @param notifyOnSuccess Whether a notification should be shown or not on success result
             * @param notifyOnUnSuccess Whether a notification should be shown or not on non-success result
             * @param callback A callback to be shown in the notification as an action to be taken by the user
             * @returns {boolean} true if success, false otherwise
             */
            function fnEvaluateAuthenticationData(data, notifyOnSuccess, notifyOnUnSuccess, callback) {
                if (data) {
                    if (data[self.service.item_token_resp]) {
                        self.service.userAuthResponse = data[self.service.auth_user_resp];
                        self.service.itemToken = data[self.service.item_token_resp];
                        self.service.itemRefreshToken = data[self.service.item_refresh_token_req_resp];
                        self.service.authPermissions = data[self.service.auth_permissions_resp];
                        if (notifyOnSuccess) {
                            //todo
                        }

                        return true
                    }
                    else {
                        if (notifyOnUnSuccess) {
                            //todo
                        }

                        return false
                    }
                }
                if (notifyOnUnSuccess) {
                    //todo
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

        systemSrv.$inject = ['__env', 'notificationSrv'];

        angular.module('rrms')
            .service('systemSrv', systemSrv);
    }
)();