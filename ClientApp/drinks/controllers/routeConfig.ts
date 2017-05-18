/**
 * Created by elliot.hurdiss on 26/04/2017.
 */

// In case we add more pages in later on  //


namespace app {
    'use strict';

    angular.module('acuCafe')
        .config(initDebug)
        .config(['$routeProvider', config]);

    function initDebug($compileProvider: angular.ICompileProvider): void {
        $compileProvider.debugInfoEnabled(true);
    }

    function config($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl: 'ClientApp/common/html/Menu.html',
                controller: 'drinkController',
                controllerAs: 'vm'
            })
            .otherwise('/')
    }
}

