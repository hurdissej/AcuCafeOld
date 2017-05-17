/**
 * Created by elliot.hurdiss on 10/05/2017.
 */

(function(){
    angular
        .module('acuCafe')
        .factory('drinkService', ['$http', drinkService]);

    function drinkService($http){
        return {
            getAllDrinks: getAllDrinks
        };

        function getAllDrinks(){

            return $http({
                method: 'get',
                url: 'https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Drink/'
            }).then(function (result) {
                return result.data;
            });

        }

    }

}());