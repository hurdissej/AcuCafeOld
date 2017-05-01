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
         $scope.loadingDrinks = true;
         $scope.loadingOptions = true;
         $scope.drink = 0;
         $scope.optionIDs = [];

        // To do - Code own CORS function or update client side //
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
        $scope.addDrink = function (drinkID) {
            $scope.drink = drinkID;
        };

        $scope.optionSelection = function toggleSelection(optionID) {
            var idx = $scope.optionIDs.indexOf(optionID);

            // Is currently selected
            if (idx > -1) {
              $scope.optionIDs.splice(idx, 1);
              console.log($scope.optionIDs);
            }
             // Is newly selected
            else {
                $scope.optionIDs.push(optionID);
                console.log($scope.optionIDs)
            }
        };

        $scope.orderDrink= function(optionIDs){
            var drinks = {
                "drinks": [
                        {
                            "drinkId": $scope.drink,
                            "optionIds": $scope.optionIDs
                        }]};
            $http.post('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Order', drinks)
            .then(function(response) {
                    alert("Order posted!");
                    console.log(drinks);
                },
                function () {
                    alert("Could not post your order");
                });

        };

    }
})();