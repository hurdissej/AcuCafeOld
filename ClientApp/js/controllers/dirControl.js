/**
 * Created by elliot.hurdiss on 17/05/2017.
 */
var acuCafe;
(function (acuCafe) {
    var dirControl = (function () {
        function dirControl() {
            this.user = {
                name: 'Luke SkyWalker',
                address: 'PO Box 123'
            };
        }
        return dirControl;
    }());
    acuCafe.dirControl = dirControl;
    angular
        .module('acuCafe')
        .controller('dirControl', dirControl);
})(acuCafe || (acuCafe = {}));
