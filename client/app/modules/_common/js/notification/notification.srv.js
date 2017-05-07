/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var notificationSrv = function (toastSrv) {
    var self = this;

    self.service = {
        mutedNotifications: false,
        type: {
            INFO: "INFO",
            WARNING: "WARNING",
            ERROR: "ERROR",
            QUESTION: "QUESTION",
            SUCCESS: "SUCCESS"
        },

        utilText: {
            "titleError": {
                en: "Error",
                es: "Error"
            },
            "titleSuccess": {
                en: "Success: ",
                es: "Éxito"
            },
            "successfulOperation": {
                en: "Operation done successfully",
                es: "Operación terminada correctamente"
            },
            "unSuccessfulOperation": {
                en: "Operation done unsuccessfully",
                es: "Operación terminada incorrectamente"
            },
            "mustSelectElement": {
                en: "You must select an element in order to proceed",
                es: "Usted debe seleccionar un elemento para continuar"
            },
            "unauthorized":{
                en: "You either aren't authorized to do this or your session expired :(",
                es: "No estás autorizado a hacer esto o tu sesión expiró:("
            },
            "userAndPasswordIncorrect":{
                en: "The user or password provided are incorrect :(",
                es: "El usuario o la contraseña proporcionados son incorrectos :("
            }
        },

        showNotification: fnShow
    };

    return self.service;

    /**
     * Shows a notification
     * @param message Notification message
     * @param type (optional) Notification type: "INFO" (default), "WARNING", "ERROR", "QUESTION", "SUCCESS"
     * @param actions (optional) Functions to be executed as action presented by a Text
     * @param actionNames (optional) Texts which names the actions
     * @param primaryActionName name of the action marked as primary (highlighted by default). It must be exactly one of
     * the strings in the array "actionNames"
     */
    function fnShow(type, message, actions, actionNames, primaryActionName) {
        var buttons = [];
        //wrap buttons info
        if (angular.isDefined(actions) && angular.isDefined(actionNames)) {
            if (angular.isArray(actions) && angular.isArray(actionNames)) {
                if (actions.length === actionNames.length) {
                    var act;
                    angular.forEach(actions,function (obj, idx) {
                        if (angular.isDefined(obj) && angular.isFunction(obj)) {
                            act = {function: obj, text: actionNames[idx]};
                            if (actionNames[idx] === primaryActionName) {
                                act.primary = true;
                            }
                            buttons.push(act);
                        }
                        else{ console.warn('Action for text ' + actionNames[idx] + ' must be a function'); }
                    })
                } else { console.warn('Action and actions names must be the same length'); }
            } else { console.warn('Action and actions names must be arrays'); }
        }
        toastSrv.messageType = type;
        toastSrv.show(message, buttons);
    }
};

angular.module('rrms')
    .service('notificationSrv', ['toastSrv', notificationSrv]);