
/**
 * Created by elliot.hurdiss on 26/04/2017.
 */
/// <reference path="drinks/services/drinkService.js" />

namespace acuCafe {
    'use strict';
        angular.module('acuCore', ['ngRoute']);

        angular.module('acuCafe', ['acuCore', 'acuDrinks']);

}


