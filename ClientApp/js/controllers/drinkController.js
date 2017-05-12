/**
 * Created by elliot.hurdiss on 26/04/2017.
 */
var acuCafe;
(function (acuCafe) {
    'use strict';
    var drinkController = (function () {
        function drinkController($http, drinkService) {
            var _this = this;
            this.$http = $http;
            this.drinkService = drinkService;
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
            this.getDrinks().then(function (result) {
                _this.drinks = result;
                _this.loadingDrinks = false;
            });
            this.serviceTest = drinkService.getAllDrinks();
            this.getOptions().then(function (result) {
                _this.options = result;
                _this.loadingOptions = false;
            });
        }
        drinkController.prototype.addDrink = function (drinkID, description, price) {
            price = Math.round(price * 100) / 100;
            this.drink = drinkID;
            this.userDrink = description;
            this.runningTotal += price;
            console.log(this.runningTotal);
        };
        ;
        drinkController.prototype.optionSelection = function (optionID, optionDescription, optionPrice) {
            console.log(optionID);
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
        drinkController.prototype.getDrinks = function () {
            return this.$http({
                method: 'get',
                url: 'https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Drink/'
            }).then(function (result) {
                return result.data;
            });
        };
        drinkController.prototype.getOptions = function () {
            return this.$http({
                method: 'get',
                url: 'https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Option/'
            }).then(function (result) {
                return result.data;
            });
        };
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
            this.$http.post('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Order', drinks)
                .then(function () {
                alert("Your order will be with you shortly!!");
            }, function () {
                alert("Could not post your order");
            });
        };
        ;
        return drinkController;
    }());
    drinkController.$inject = ['$http', 'drinkService'];
    acuCafe.drinkController = drinkController;
    angular
        .module('acuCafe')
        .controller('drinkController', ['$http', 'drinkService', drinkController]);
})(acuCafe || (acuCafe = {}));
