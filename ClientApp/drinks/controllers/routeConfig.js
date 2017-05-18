/**
 * Created by elliot.hurdiss on 26/04/2017.
 */
// In case we add more pages in later on  //
var app;
(function (app) {
    'use strict';
    angular.module('acuCafe')
        .config(initDebug)
        .config(['$routeProvider', config]);
    function initDebug($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
    }
    function config($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'ClientApp/drinks/templates/Menu.html',
            controller: 'drinkController',
            controllerAs: 'vm'
        })
            .otherwise('/');
    }
})(app || (app = {}));
