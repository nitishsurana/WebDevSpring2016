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

        function search(queryType, query){
            console.log("Search service main function");
            if (queryType == 'Investment Option'){
                return searchYahoo(query);
            }
            else{
                searchInvestor(query);
            }
        }

        function searchInvestor(queryText){
            $rootScope.returnData = UserService.findUser(queryText);
            $rootScope.returnData.resultType = "Investor";
            $rootScope.returnData.query = queryText;
            $location.url('/search');
        }
        function searchYahoo(query){
            console.log("Search service client");
            console.log(query);
            $location.url('/search');
            return $http.get("/api/project/search-option/"+ query);
            //console.log(result);

        }
    }
})();