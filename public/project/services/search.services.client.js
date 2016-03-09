/**
 * Created by Nitish on 3/8/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .factory("SearchService", SearchService);

    function SearchService($location, $http){
        var returnData = {
            "name": "",
            "symbol": "",
            "ltp": "",
        };

        var api={
            search: search,
            returnData: returnData
        };
        return api;

        function search(queryType, queryText){
            if (queryType == 'Investment Option'){
                searchYahoo(queryText);
            }
            else{
                searchInvestor();
            }
        }

        function searchInvestor(){

        }
        function searchYahoo(queryText){

            $http({
                method: 'GET',
                url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20%3D%20%22' + queryText + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response.data.query.results.quote);
                if (response.data.query.results.quote.Name == ""){
                    returnData = {
                        "name": "",
                        "symbol": "",
                        "ltp": "",
                    };
                }
                else {
                    returnData.symbol = response.data.query.results.quote.Symbol;
                    returnData.name = response.data.query.results.quote.Name;
                    returnData.ltp = response.data.query.results.quote.LastTradePriceOnly;
                }
                $location.url('/search');
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
                $location.url('/search');
            });
        }
    }
})();