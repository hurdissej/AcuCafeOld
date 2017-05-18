/**
 * Created by elliot.hurdiss on 26/04/2017.
 */
var acuCafe;
(function (acuCafe) {
    'use strict';
    var drinkController = (function () {
        function drinkController(drinkService, optionService, orderService) {
            var _this = this;
            this.drinkService = drinkService;
            this.optionService = optionService;
            this.orderService = orderService;
            this.loadingDrinks = true;
            this.loadingOptions = true;
            this.drink = 0;
            this.optionIDs = [];
            this.basketEmpty = true;
            this.userDrink = '';
            this.userOptions = [];
            this.allOrders = [];
            this.total = 0;
            this.runningTotal = 0;
            this.drinks = [];
            this.options = [];
            this.drinkService.getAllDrinks().then(function (result) {
                _this.drinks = result;
                _this.loadingDrinks = false;
            });
            optionService.getAllOptions().then(function (result) {
                _this.options = result;
                _this.loadingOptions = false;
            });
        }
        drinkController.prototype.addDrink = function (drinkID, description, price) {
            price = Math.round(price * 100) / 100;
            this.drink = drinkID;
            this.userDrink = description;
            this.runningTotal += price;
        };
        ;
        drinkController.prototype.optionSelection = function (optionID, optionDescription, optionPrice) {
            var idx = this.optionIDs.indexOf(optionID);
            var price = Math.round(optionPrice * 100) / 100;
            // Is currently selected
            if (idx > -1) {
                this.optionIDs.splice(idx, 1);
                this.userOptions.splice(idx, 1);
                this.runningTotal -= price;
            }
            else {
                this.optionIDs.push(optionID);
                this.userOptions.push(optionDescription);
                this.runningTotal += price;
            }
        };
        ;
        drinkController.prototype.exit = function () {
            this.runningTotal = 0;
        };
        ;
        drinkController.prototype.orderDrink = function (optionIDs) {
            // Create User friendly data version for display
            var userfriendlyDrinks = {
                "drink": this.userDrink,
                "options": this.userOptions
            };
            // Create API data
            var drinks = {
                "drinks": [
                    {
                        "drinkId": this.drink,
                        "optionIds": this.optionIDs
                    }
                ]
            };
            // Clear UI
            this.allOrders.push(userfriendlyDrinks);
            this.basketEmpty = false;
            this.userOptions = [];
            this.total += this.runningTotal;
            this.runningTotal = 0;
            // Uncheck checkboxes
            angular.forEach(this.options, function (option) {
                option.Selected = false;
            });
            // Order the drink
            this.orderService.postOrders(drinks);
        };
        ;
        return drinkController;
    }());
    drinkController.$inject = ['drinkService', 'optionService', 'orderService'];
    acuCafe.drinkController = drinkController;
    angular
        .module('acuCafe')
        .controller('drinkController', drinkController);
})(acuCafe || (acuCafe = {}));
