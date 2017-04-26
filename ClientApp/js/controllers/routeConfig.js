/**
 * Created by elliot.hurdiss on 26/04/2017.
 */

// In case we add more pages in later on  //
(function () {
    'use strict';

    angular.module('acuCafe')
        .config(['$routeProvider', config]);

    function config($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl: 'ClientApp/html/Menu.html',
                controller: 'drinkController'
            })
            .otherwise('/')
    }
})();

