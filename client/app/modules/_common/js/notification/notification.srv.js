/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var notificationSrv = function (toastSrv) {
    var self = this;

    self.service = {
        htmlContent: null,
        type: {
            INFO: 'Información: ',
            CONF: 'Confirmación: ',
            ERROR: 'Error: ',
            SUCCESS: 'Éxito: ',
            WARNING: 'Advertencia: '
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
                en: "You either aren't authorized to do this or you session expired :(",
                es: "No estás autorizado a hacer esto o tu sessión expiró:("
            },
            "userAndPasswordIncorrect":{
                en: "The user or password provided by you are incorrect :(",
                es: "El usuario o la contraseña proporcionados son incorrectos :("
            }
        },

        showNotif: fnShow
    };

    return self.service;

    /**
     * Shows a notification
     * @param message Notification message
     * @param title (optional) Title for this notification
     * @param type (optional) Notification type. It must be one of the following: notificationSrv.type.INFO, notificationSrv.type.CONF,
     * notificationSrv.type.ERROR, notificationSrv.type.SUCCESS or notificationSrv.type.WARNING. If not type is provided,
     * notificationSrv.type.INFO will be used
     * @param actions (optional) Functions to be executed as action presented by a Text
     * @param actionNames (optional) Texts which names the actions
     */
    function fnShow(message, title, type, actions, actionNames) {
        var buttons = [];

        //wrap buttons info
        if (angular.isDefined(actions) && angular.isDefined(actionNames)) {
            if (angular.isArray(actions) && angular.isArray(actionNames)) {
                if (actions.length === actionNames.length) {
                    angular.forEach(actions,function (obj, idx) {
                        if (angular.isDefined(obj) && angular.isFunction(obj)) {
                            buttons.push(
                                {action: obj, text: actionNames[idx]}
                            )
                        }
                        else{
                            console.warn('Action for text ' + actionNames[idx] + ' must be a function');
                        }
                    })
                }
                else {
                    console.warn('Action and actions names must be the same length');
                }
            }
            else {
                console.warn('Action and actions names must be arrays');
            }
        }

        toastSrv.show(message, buttons);
    }
};

notificationSrv.$inject = ['toastSrv'];

angular.module('rrms')
    .service('notificationSrv', notificationSrv);