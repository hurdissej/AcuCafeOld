/**
 * Created by elliot.hurdiss on 17/05/2017.
 */
(function() {
    'use strict';
    angular
        .module('acuCafe')
        .directive('orderDirective', orderDirective);

    function orderDirective() {
        return {
            templateUrl: "ClientApp/html/templates/orderPopup.html",
            restrict: "E",
            replace: true
        };
    }
}());