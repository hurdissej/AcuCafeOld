/**
 * Created by elliot.hurdiss on 26/04/2017.
 */
(function(){
    'use strict';
    angular
        .module('acuCafe')
        .controller('drinkController',[
            '$scope', '$http', drinkController
        ]);

    function drinkController($scope, $http,$routeParams){
         $scope.drinks = [];
         $scope.options = [];
         $scope.loadingDrinks = true;
         $scope.loadingOptions = true;
         // To do - Code own CORS //
         $http.get('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Drink/')
             .then(function(response){
                $scope.drinks = response.data;
                })
             .finally(function(){
                 $scope.loadingDrinks = false;
             });
         $http.get('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Option/')
             .then(function(response){
                $scope.options = response.data;
                })
             .finally(function(){
                 $scope.loadingOptions = false;
             })
         ;
     }
})();