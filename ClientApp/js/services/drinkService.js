/**
 * Created by elliot.hurdiss on 10/05/2017.
 */

(function(){
    angular
        .module('acuCafe')
        .factory('drinkService', drinkService);

    function drinkService(){
        console.log("Service Called");
        return {
            getAllDrinks: getAllDrinks
        }

        function getAllDrinks(){
            console.log("Service Called");
/*
            return this.$http({
                method: 'get',
                url: 'https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Drink/'
            }).then(function (result) {
                return result.data;
            });
*/
        }

    }

}());