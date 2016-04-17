/**
 * Created by Nitish on 3/2/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location) {

        var vm = this;

        vm.search = search;
        function search(query) {
            $rootScope.queryAtHome = query;
            $location.url("/search");
        }
    }
})();