/**
 * Created by Nitish on 3/3/2016.
 */
(function() {
    angular
        .module('PortfolioManager')
        .controller("SearchController", SearchController);

    function SearchController($scope, $http) {
        var base_url = 'https://query.yahooapis.com/v1/public/yql?q=';
        var query =
        $http({
            method: 'GET',
            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.stocks%20where%20symbol%3D%22yahoo%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response.data.query);
            console.log(response.data.query.results.stock);
            $scope.result = response.data.query.results.stock.symbol;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
        });
    }
})();

