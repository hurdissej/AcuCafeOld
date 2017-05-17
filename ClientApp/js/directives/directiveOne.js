/**
 * Created by elliot.hurdiss on 17/05/2017.
 */
angular
    .module('acuCafe')
    .directive('directiveOne', directiveOne);

function directiveOne() {
    return {
        templateUrl: "ClientApp/html/card.html",
        restrict: "E",
        replace: true
    }
}