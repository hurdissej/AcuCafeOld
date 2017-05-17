/**
 * Created by elliot.hurdiss on 17/05/2017.
 */
angular
    .module('acuCafe')
    .directive('orderDirective', orderDirective);

function orderDirective(){
    return{
        templateUrl: "ClientApp/html/templates/orderPopup.html",
        restrict: "E",
        replace: true
    }
}