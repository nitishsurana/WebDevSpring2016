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
            search: search,
            searchYahoo: searchYahoo,
            searchInvestorById: searchInvestorById,
            getCurrentValueOfStocks: getCurrentValueOfStocks,
            searchYahooIndex: searchYahooIndex
        };
        return api;

        function search(queryType, query){
            //console.log("Search service main function");
            if (queryType == 'Investment Option'){
                return searchCompanySymbol(query);
            }
            else{
                return searchInvestor(query);
            }
        }

        function searchInvestor(queryText){
            //console.log("seacrch investor");
            return UserService.findUser(queryText);/*
            $rootScope.returnData.resultType = "Investor";
            $rootScope.returnData.query = queryText;
            $location.url('/search');*/
        }
        
        function searchInvestorById(userId)
        {
            return UserService.findUser(userId);
        }        
        
        function searchCompanySymbol(query){
            //console.log("Search service client");
            //console.log(query);
            $location.url('/search');
            return $http.get("/api/project/search-option/"+ query);
            //console.log(result);

        }

        function searchYahoo(symbol) {
            //console.log(symbol);
            return $http.get("/api/project/search-yahoo/"+symbol);
        }
        
        function searchYahooIndex(symbol){
            return $http.get("/api/project/search-yahoo/index/"+symbol);
        }
        function getCurrentValueOfStocks(stocks) {
            for(var i=0; i<stocks.length; i++){
                console.log($http.get("/api/project/search-yahoo/"+stocks[i].symbol));
            }
        }
    }
})();