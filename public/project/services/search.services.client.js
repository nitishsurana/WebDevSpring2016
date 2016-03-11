/**
 * Created by Nitish on 3/8/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .factory("SearchService", SearchService);

    function SearchService($rootScope,$location, $http, UserService){
        $rootScope.returnData = {
            "resultType": "",
            "name": "",
            "symbol": "",
            "ltp": "",
            "query": ""
        };
        var api={
            search: search
        };
        return api;

        function search(queryType, queryText){
            if (queryType == 'Investment Option'){
                searchYahoo(queryText);
            }
            else{
                searchInvestor(queryText);
            }
        }

        function searchInvestor(queryText){
            $rootScope.returnData = UserService.findUser(queryText);
            $rootScope.returnData.resultType = "Investor";
            $rootScope.returnData.query = queryText;
            $location.url('/search');
        }
        function searchYahoo(queryText){
            $http({
                method: 'GET',
                url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20%22' + queryText + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                if (response.data.query.results.quote.Name == ""){
                    $rootScope.returnData = {
                        "Result": "Oops, the symbol does not exist",
                        "symbol": queryText,
                        "resultType": "YQL"
                    };

                }
                else {
                    $rootScope.returnData = response.data.query.results.quote;
                    $rootScope.returnData.resultType = "YQL";
                    $rootScope.returnData.query = queryText;
                }
                $location.url('/search');

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $location.url('/');
                alert("Error in connection. Please try again.");
            });
        }
    }
})();