/**
 * Created by elliot.hurdiss on 26/04/2017.
 */


namespace app {
    'use strict';


    export class drinkController {
        static $inject = ['$http'];
        loadingDrinks = true;
        loadingOptions = true;
        drink = 0;
        optionIDs = [];
        basketEmpty = true;
        userDrink = '';
        userOptions = [];
        allOrders: Array<any> = [];
        total = 0;
        runningTotal = 0;
        drinks = [];
        options = [];

        constructor(public $http: angular.IHttpService){
            this.getDrinks().then((result) => {
                this.drinks = result;
                this.loadingDrinks = false;
            });
            this.getOptions().then((result) => {
                this.options = result;
                this.loadingOptions = false;
            });
        }

        public addDrink(drinkID: number, description: string, price: number){
            price = Math.round(price *100) /100;
            this.drink = drinkID;
            this.userDrink = description;
            this.runningTotal += price ;
            console.log(this.runningTotal);
        };

        public optionSelection(optionID, optionDescription, optionPrice) {
            console.log(optionID);
            const idx = this.optionIDs.indexOf(optionID);
            const price = Math.round(optionPrice * 100)/100;
            // Is currently selected
            if (idx > -1) {
                this.optionIDs.splice(idx, 1);
                this.userOptions.splice(idx, 1);
                this.runningTotal -= price ;
            }
             // Is newly selected
            else {
                this.optionIDs.push(optionID);
                this.userOptions.push(optionDescription);
                this.runningTotal += price ;
            }
        };

        public exit(){
            this.runningTotal = 0;
        };

        public getDrinks(): angular.IPromise<any>{
            return this.$http({
                method: 'get',
                url: 'https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Drink/'
            }).then(function (result) {
                return result.data;
            })
        }

        public getOptions(): angular.IPromise<any>{
            return this.$http({
                method: 'get',
                url: 'https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Option/'
            }).then(function (result) {
                return result.data;
            })
        }

        public orderDrink(optionIDs){
            // Create User friendly data version for display
            const userfriendlyDrinks = {
                            "drink": this.userDrink,
                            "options": this.userOptions
                        };

            // Create API data
            const drinks = {
                "drinks": [
                        {
                            "drinkId": this.drink,
                            "optionIds": this.optionIDs
                        }]};

            // Clear UI
            this.allOrders.push(userfriendlyDrinks);
            this.basketEmpty = false;
            this.userOptions = [];
            this.total += this.runningTotal;
            this.runningTotal = 0;
            // Uncheck checkboxes
            angular.forEach(this.options, function(option) {
                option.Selected = false;
            });

            this.$http.post('https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Order', drinks)
            .then(function() {
                alert("Your order will be with you shortly!!");
                },
                function () {
                    alert("Could not post your order");
                });
        };

    }

    angular
        .module('acuCafe')
        .controller('drinkController',[
             '$http', drinkController
        ]);

}