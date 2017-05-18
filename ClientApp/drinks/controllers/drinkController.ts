/**
 * Created by elliot.hurdiss on 26/04/2017.
 */


namespace acuCafe {
    'use strict';


    export class drinkController {
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
        static $inject: string[] = ['drinkService', 'optionService', 'orderService'];
        constructor(private drinkService: any, private optionService: any, private orderService: any){

            this.drinkService.getAllDrinks().then((result) => {
                this.drinks = result;
                this.loadingDrinks = false;
            });

            optionService.getAllOptions().then((result) => {
                this.options = result;
                this.loadingOptions = false;
            });
        }

        public addDrink(drinkID: number, description: string, price: number){
            price = Math.round(price *100) /100;
            this.drink = drinkID;
            this.userDrink = description;
            this.runningTotal += price ;
        };

        public optionSelection(optionID, optionDescription, optionPrice) {
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
            // Order the drink
            this.orderService.postOrders(drinks);
        };
    }
        angular
            .module('acuCafe')
            .controller('drinkController', drinkController);
}
