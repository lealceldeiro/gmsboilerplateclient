/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var fieldValidation = function ($compile) {

        var link = function(scope, iElm, iAttrs, ngModel) {

            //avoid infinite loop
            iElm.removeAttr("field-validation");
            iElm.removeAttr("data-field-validation");
            iElm.removeClass("field-validation");

            var parent = angular.element(iElm.parent());

            //config
            if (iAttrs.fieldValidationConfig || iAttrs.dataFieldValidationConfig) {
                var c = iAttrs.fieldValidationConfig || iAttrs.dataFieldValidationConfig;
                var conf = JSON.parse(c);

                if (conf) {//valid json
                    var submitted = conf.submitted;
                    var parentClass = conf.parentClass;
                    var labelClass = conf.labelClass;
                    var iconClass = conf.iconClass;
                    var parentFixedClass = conf.parentFixedClass;
                }
            }

            //if any selector was specified
            var fieldSelector = iAttrs.fieldSelector || iAttrs.dataFieldSelector;

            if (!ngModel) {
                console.warn("field-validation-directive: you should specify a valid ng-model" + iElm[0].name ? +
                    " for the field (" + iElm[0].name + ")" : "" + " where this directive is being applied");
            }

            else {
                //todo: detect more that only one subform
                var parentForm = ngModel ? ngModel.$$parentForm : null;
                var pParentForm = parentForm ? parentForm.$$parentForm : null;

                if (!iElm[0].name) {
                    var invalid = true;
                    console.warn("field-validation-directive: you should specify a valid name for the field where this directive is being applied");
                }
                if (parentForm && parentForm.hasOwnProperty('$name') && !parentForm.$name) {
                    invalid = true;
                    console.warn("field-validation-directive: you should specify a valid name for the form where this directive is being applied");
                }
                if ((pParentForm && pParentForm.hasOwnProperty('$name')) && !pParentForm.$name) {
                    invalid = true;
                    console.warn("field-validation-directive: you should specify a valid name for the parent's parent form where this directive is being applied");
                }

                else if(!invalid){ //all good with config and directive applying

                    //prefix to append before field's name
                    var prefixBP;
                    if (pParentForm.hasOwnProperty('$name')) { //adding compatibility to ngForm in one level of nesting todo: add support for more than one level
                        prefixBP = pParentForm.$name + "." + pParentForm[parentForm.$name].$name + ".";
                    }
                    else if(parentForm){
                        prefixBP = parentForm.$name + ".";
                    }


                    //...submitted or not the parent form
                    var submt = (!parentForm || (typeof submitted !== 'undefined' && submitted == false)) ? "" : " && " + parentForm.$name + ".$submitted";

                    //error classes for highlighting the component
                    var errC = parentClass ? parentClass : 'has-error';                                         //error class for parent div///bootstrap by default
                    var lClass = labelClass ? labelClass : 'control-label';                             //error class for label with error///bootstrap by default
                    var iStyleClass = labelClass ? labelClass : 'form-control-feedback';                             //error class for label with error///bootstrap by default
                    var iClass = iconClass ? iconClass : 'glyphicon glyphicon-exclamation-sign';                      //class which applies the styling to the field for showing the icon when error///bootstrap by default
                    var pClass = parentFixedClass ? parentFixedClass : 'has-feedback';                          //class which applies the styling to the input's parent div for showing the icon when error
                    parent.addClass(pClass);

                    //... syntax to be evaluated in order to check for component validity
                    var clsReq = prefixBP + iElm[0].name + ".$invalid" + submt;


                    //... SETTING NG-CLASS

                    //specific selector instead of using the default div containing the inputs?
                    if (fieldSelector) {
                        var selector = $('#' + fieldSelector);
                    }

                    var prevNgClass = selector ? selector.attr('data-ng-class') || selector.attr('ng-class'):
                                      iElm.parent().attr('data-ng-class') || iElm.parent().attr('ng-class');
                    var newNgClass;

                    //had an ng-class set before?, then collect it and integrate mine to it
                    if (prevNgClass) {
                        newNgClass = prevNgClass.substring(0, prevNgClass.length - 1) + ", '" + errC + "': " + clsReq + "}";
                    }
                    //just put mine
                    else{
                        newNgClass = "{'" + errC + "': " + clsReq + "}";
                    }

                    //remove previous ng-class and add new one
                    if (selector) {
                        selector.removeAttr('data-ng-class');
                        selector.removeAttr('ng-class');
                        selector.attr('data-ng-class', newNgClass);
                    }
                    else{//or default(parent) element
                        iElm.parent().removeAttr('data-ng-class');
                        iElm.parent().removeAttr('ng-class');
                        iElm.parent().attr('data-ng-class', newNgClass);
                    }


                    //...CHECKING CONDITIONS

                    if (prefixBP && (iAttrs.fieldMaxlength || iAttrs.dataFieldMaxlength)) {
                        if (iAttrs.maxlengthMessage || iAttrs.dataMaxlengthMessage) {
                            var imMaxl = prefixBP + iElm[0].name + ".$viewValue.length >= " + (typeof iAttrs.fieldMaxlength !== 'undefined' ? iAttrs.fieldMaxlength : iAttrs.dataFieldMaxlength);
                            var tmMaxl = angular.element('<span>' + (iAttrs.maxlengthMessage || iAttrs.dataMaxlengthMessage) + '</span>').append(angular.element('<br/>'));
                            tmMaxl.addClass(lClass);
                            tmMaxl.attr('data-ng-show', imMaxl);
                            tmMaxl.css('color', '#2294d4');
                            parent.append(tmMaxl);
                        }
                    }

                    if (prefixBP && (iAttrs.required || iAttrs.dataRequired)) {
                        if (iAttrs.requiredMessage || iAttrs.dataRequiredMessage) {
                            var eReq = prefixBP + iElm[0].name + ".$error.required" + submt;
                            //span with text
                            var tReq = angular.element('<span>' + (iAttrs.requiredMessage || iAttrs.dataRequiredMessage) + '</span>').append(angular.element('<br/>'));
                            tReq.addClass(lClass);
                            tReq.attr('data-ng-show', eReq);
                            //ico
                            var tReqI = angular.element('<span>').addClass(iStyleClass).addClass(iClass);
                            tReqI.attr('data-ng-show', eReq);

                            parent.append(tReqI);
                            parent.append(tReq);
                        }

                    }

                    if (prefixBP && (iAttrs.ngMinlength || iAttrs.dataNgMinlength)) {
                        if (iAttrs.minlengthMessage || iAttrs.dataMinlengthMessage) {
                            var eMinl = prefixBP + iElm[0].name + ".$error.minlength" + submt;
                            //span with text
                            var tMinl = angular.element('<span>' + (iAttrs.minlengthMessage || iAttrs.dataMinlengthMessage) + '</span>').append(angular.element('<br/>'));
                            tMinl.addClass(lClass);
                            tMinl.attr('data-ng-show', eMinl);
                            //ico
                            var tMinlI = angular.element('<span>').addClass(iStyleClass).addClass(iClass);
                            tMinlI.attr('data-ng-show', eMinl);

                            parent.append(tMinlI);
                            parent.append(tMinl);
                        }
                    }

                    if (prefixBP && (iAttrs.type || iAttrs.dataType)) {
                        if (iAttrs.typeMessage || iAttrs.dataTypeMessage) {
                            var etype = prefixBP + iElm[0].name + ".$error." + iAttrs.type.toString() + submt;
                            //span with text
                            var ttype = angular.element('<span>' + (iAttrs.typeMessage || iAttrs.dataTypeMessage) + '</span>').append(angular.element('<br/>'));
                            ttype.addClass(lClass);
                            ttype.attr('data-ng-show', etype);
                            //ico
                            var ttypeI = angular.element('<span>').addClass(iStyleClass).addClass(iClass);
                            ttypeI.attr('data-ng-show', etype);

                            parent.append(ttypeI);
                            parent.append(ttype);
                        }
                    }

                    if (prefixBP && (iAttrs.ngMaxlength || iAttrs.dataNgMaxlength)) {
                        if (iAttrs.maxlengthMessage || iAttrs.dataMaxlengthMessage) {
                            var eMaxl = prefixBP + iElm[0].name + ".$error.maxlength" + submt;
                            //span with text
                            var tMaxl = angular.element('<span>' + (iAttrs.maxlengthMessage || iAttrs.dataMaxlengthMessage) + '</span>').append(angular.element('<br/>'));
                            tMaxl.addClass(lClass);
                            tMaxl.attr('data-ng-show', eMaxl);
                            //ico
                            var tMaxlI = angular.element('<span>').addClass(iStyleClass).addClass(iClass);
                            tMaxlI.attr('data-ng-show', eMaxl);

                            parent.append(tMaxlI);
                            parent.append(tMaxl);
                        }
                    }

                    if (prefixBP && (iAttrs.ngPattern || iAttrs.dataNgPattern)) {
                        if (iAttrs.patternMessage || iAttrs.dataPatternMessage) {
                            var eP = prefixBP + iElm[0].name + ".$error.pattern" + submt;
                            //span with text
                            var tP = angular.element('<span>' + (iAttrs.patternMessage || iAttrs.dataPatternMessage) + '</span>').append(angular.element('<br/>'));
                            tP.addClass(lClass);
                            tP.attr('data-ng-show', eP);
                            //ico
                            var tPI = angular.element('<span>').addClass(iStyleClass).addClass(iClass);
                            tPI.attr('data-ng-show', eP);

                            parent.append(tPI);
                            parent.append(tP);
                        }
                    }

                }
            }

            $compile(parent)(scope);

        };
        return {
            link: link,
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            require: '?ngModel'
        };
    };

    fieldValidation.$inject = ['$compile'];

    angular.module('rrms')
        .directive('fieldValidation', fieldValidation);
}());