/**
 * Created by elliot.hurdiss on 17/05/2017.
 */
namespace acuCafe {
    export class dirControl{
        user = {
            name: 'Luke SkyWalker',
            address: 'PO Box 123'
    };
        constructor(){}
    }
    angular
        .module('acuCafe')
        .controller('dirControl', dirControl);
}