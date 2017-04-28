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
         $scope.drinksCart = [];
         $scope.optionsCart = [];
         $scope.options = [];
         $scope.cart = [];
         $scope.total = 0.00;
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
             });
        //
        $scope.addDrinksToCart = function(acuOrder, option){
            $scope.drinksCart.push(acuOrder);
            //var value = Math.round((acuOrder.price * option)*100)/100;
            $scope.total += Math.round((acuOrder.price * option)*100)/100;
            console.log($scope.drinksCart);
        };

        $scope.addOptionsToCart = function(acuOrder, option){
            $scope.optionsCart.push(acuOrder);
            //var value = Math.round((acuOrder.price * option)*100)/100;
            $scope.total += Math.round((acuOrder.price * option)*100)/100;
            console.log($scope.optionsCart);
        };

        $scope.submitOrder = function(cart){
            console.log(drinksCart);
        }
    }
})();