/**
 * Created by elliot.hurdiss on 26/04/2017.
 */
var app;
(function (app) {
    'use strict';
    angular
        .module('acuCafe')
        .controller('drinkController', [
        'vm', '$http', drinkController
    ]);
    function drinkController(vm, $http, $routeParams) {
        // For API
        vm.loadingDrinks = true;
        vm.loadingOptions = true;
        vm.drink = 0;
        vm.optionIDs = [];
        // For UI
        vm.basketEmpty = true;
        vm.userDrink = '';
        vm.userOptions = [];
        vm.allOrders = [];
        vm.total = 0;
        vm.runningTotal = 0;
        // To do - Code own CORS function or update server side //
        $http.get('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Drink/')
            .then(function (response) {
            vm.drinks = response.data;
        })
            .finally(function () {
            vm.loadingDrinks = false;
        });
        $http.get('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Option/')
            .then(function (response) {
            vm.options = response.data;
        })
            .finally(function () {
            vm.loadingOptions = false;
        });
        //
        vm.addDrink = function (drinkID, description, price) {
            price = Math.round(price * 100) / 100;
            vm.drink = drinkID;
            vm.userDrink = description;
            vm.runningTotal += price;
            console.log(vm.runningTotal);
        };
        vm.optionSelection = function toggleSelection(optionID, optionDescription, optionPrice) {
            var idx = vm.optionIDs.indexOf(optionID);
            var price = Math.round(optionPrice * 100) / 100;
            // Is currently selected
            if (idx > -1) {
                vm.optionIDs.splice(idx, 1);
                vm.userOptions.splice(idx, 1);
                vm.runningTotal -= price;
            }
            else {
                vm.optionIDs.push(optionID);
                vm.userOptions.push(optionDescription);
                vm.runningTotal += price;
            }
        };
        vm.exit = function () {
            vm.runningTotal = 0;
        };
        vm.orderDrink = function (optionIDs) {
            // Create User friendly data version for display
            var userfriendlyDrinks = {
                "drink": vm.userDrink,
                "options": vm.userOptions
            };
            // Create API data
            var drinks = {
                "drinks": [
                    {
                        "drinkId": vm.drink,
                        "optionIds": vm.optionIDs
                    }
                ]
            };
            $http.post('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Order', drinks)
                .then(function (response) {
                // To do make some nice Bootstrap pop-ups //
                alert("Your order will be with you shortly!!");
                // Clear UI
                vm.allOrders.push(userfriendlyDrinks);
                vm.basketEmpty = false;
                vm.userOptions = [];
                vm.total += vm.runningTotal;
                vm.runningTotal = 0;
                // Uncheck checkboxes
                angular.forEach(vm.options, function (option) {
                    option.Selected = false;
                });
            }, function () {
                alert("Could not post your order");
            });
        };
    }
})(app || (app = {}));
