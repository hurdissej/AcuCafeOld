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
        // For API
         $scope.loadingDrinks = true;
         $scope.loadingOptions = true;
         $scope.drink = 0;
         $scope.optionIDs = [];
        // For UI
         $scope.basketEmpty = true;
         $scope.userDrink = '';
         $scope.userOptions = [];
         $scope.allOrders = [];
         $scope.total = 0;
         $scope.runningTotal = 0;

        // To do - Code own CORS function or update server side //
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
        $scope.addDrink = function (drinkID, description, price) {
            price = Math.round(price *100) /100;
            $scope.drink = drinkID;
            $scope.userDrink = description;
            $scope.runningTotal += price ;
            console.log($scope.runningTotal);
        };

        $scope.optionSelection = function toggleSelection(optionID, optionDescription, optionPrice) {
            var idx = $scope.optionIDs.indexOf(optionID);
            var price = Math.round(optionPrice * 100)/100;
            // Is currently selected
            if (idx > -1) {
                $scope.optionIDs.splice(idx, 1);
                $scope.userOptions.splice(idx, 1);
                $scope.runningTotal -= price ;
            }
             // Is newly selected
            else {
                $scope.optionIDs.push(optionID);
                $scope.userOptions.push(optionDescription);
                $scope.runningTotal += price ;
            }
        };

        $scope.exit = function(){
            $scope.runningTotal = 0;
        };

        $scope.orderDrink= function(optionIDs){
            // Create User friendly data version for display
            var userfriendlyDrinks = {
                            "drink": $scope.userDrink,
                            "options": $scope.userOptions
                        };

            // Create API data
            var drinks = {
                "drinks": [
                        {
                            "drinkId": $scope.drink,
                            "optionIds": $scope.optionIDs
                        }]};

            $http.post('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Order', drinks)
            .then(function(response) {
                    // To do make some nice Bootstrap pop-ups //
                    alert("Your order will be with you shortly!!");

                    // Clear UI
                    $scope.allOrders.push(userfriendlyDrinks);
                    $scope.basketEmpty = false;
                    $scope.userOptions = [];
                    $scope.total += $scope.runningTotal;
                    $scope.runningTotal = 0;
                    // Uncheck checkboxes
                    angular.forEach($scope.options, function(option) {
                        option.Selected = false;
                    })
                },
                function () {
                    alert("Could not post your order");
                });

        };

    }
})();