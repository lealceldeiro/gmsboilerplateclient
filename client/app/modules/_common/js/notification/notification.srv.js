/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var notificationSrv = function ($timeout) {
    var self = this;

    var timer;
    var callBack = null;
    const c = {
        'success': 'alert-success',
        'info': 'alert-info',
        'warning': 'alert-warning',
        'danger': 'alert-danger'
    };
    const ico = {
        'success': 'glyphicon-ok-sign',
        'info': 'glyphicon-info-sign',
        'warning': 'glyphicon-exclamation-sign',
        'danger': 'glyphicon-remove-sign'

    };

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

        showNotif: fnShow,
        executeCallBack: fnExecuteCallBack
    };

    return self.service;

    /**
     * Shows a notification
     * @param message Notification message
     * @param title (optional) Title for this notification
     * @param type (optional) Notification type. It must be one of the following: notificationSrv.type.INFO, notificationSrv.type.CONF,
     * notificationSrv.type.ERROR, notificationSrv.type.SUCCESS or notificationSrv.type.WARNING. If not type is provided,
     * notificationSrv.type.INFO will be used
     * @param action (optional) Function to be executed as action presented by a Text
     * @param actionName (optional) Text which names the action to be executed by the function passes as parameter
     */
    function fnShow(message, title, type, action, actionName) {

        if (typeof message === 'undefined' || message === null) {
            throw new Error('A message must be provided for showing a notification');
        }

        //div
        const notif = angular.element('<div class="text-center notification alert alert-dismissible fade in" role="alert" id="notifBadge">');
        //close button
        notif.append(
            angular.element(
                '<button type="button" class="hidden-xs hidden-sm close" data-dismiss="alert">' +
                '   <span aria-hidden="true" data-ng-click="nc.clear()">&times;</span>' +
                '   <span class="sr-only">Cerrar</span>' +
                '</button>'
            )
        );

        //class (alert type)
        var dClass = '';
        var iconClass = 'glyphicon ';
        switch (type) {
            case self.service.type.INFO:
                dClass += c.info;
                iconClass += ico.info;
                break;
            case self.service.type.CONF:
                dClass += c.warning;
                iconClass += ico.warning;
                break;
            case self.service.type.ERROR:
                dClass += c.danger;
                iconClass += ico.danger;
                break;
            case self.service.type.SUCCESS:
                dClass += c.success;
                iconClass += ico.success;
                break;
            case self.service.type.WARNING:
                dClass += c.warning;
                iconClass += ico.warning;
                break;
            default:
                dClass += c.info;
                iconClass += ico.info;
        }

        //title
        var text = title  ? (title  + ': ') : type;
        var t = angular.element('' +
            '<strong class="hidden-xs hidden-sm">' + text + '</strong><span class="hidden-xs hidden-sm">' +  message + '</span>');
        var tSM = angular.element('<span class="visible-xs visible-sm"><i class="' + iconClass + '"></i></span>');

        notif.addClass(dClass);
        notif.append(t);
        notif.append(tSM);
        //if call back for taking any action
        if (action) { //only for devices with width > md (bootstrap)
            callBack = action;
            notif.append('&nbsp;&nbsp;');
            const undo = angular.element('<u><strong class=""><a class="hand-pointer text-muted" data-ng-click="nc.executeCallBack()">' + actionName + '</a></strong></u>');
            notif.append(undo);
        }

        const wrapper = angular.element('<div>').append(notif);
        self.service.htmlContent = wrapper.html();

        if (timer) {
            $timeout.cancel(timer);
        }
        timer = $timeout(
            function () {
                self.service.htmlContent = null;
                angular.element( document.querySelector('#notifBadge') ).alert('close');
            },
            5000
        )

    }

    function fnExecuteCallBack() {
        if (callBack && angular.isFunction(callBack)) {
            callBack();
            angular.element( document.querySelector('#notifBadge') ).alert('close');
        }
    }
};

notificationSrv.$inject = ['$timeout'];

angular.module('rrms')
    .service('notificationSrv', notificationSrv);