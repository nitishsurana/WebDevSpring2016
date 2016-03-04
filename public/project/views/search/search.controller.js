/**
 * Created by Nitish on 3/3/2016.
 */
(function() {
    angular
        .module('PortfolioManager')
        .controller("SearchController", SearchController);

    function SearchController($scope, $http) {
        console.log($http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22BHP.AX%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="));
    }
})();
