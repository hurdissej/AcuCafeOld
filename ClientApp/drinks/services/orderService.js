/**
 * Created by elliot.hurdiss on 17/05/2017.
 */
(function () {
    angular
        .module('acuDrinks')
        .factory('orderService', ['$http', orderService]);

    function orderService($http) {
        return {
            postOrders: postOrders
        };

        function postOrders(drinks) {
            console.log(drinks);
            return $http({
                method: 'POST',
                url: 'https://cors-anywhere.herokuapp.com/http://acucafe.acumen.rocks/api/Order',
                data: drinks
            }).then(function() {
                alert("Your order will be with you shortly!!");
                },
                function () {
                alert("Could not post your order");
                });
        }
    }
}());