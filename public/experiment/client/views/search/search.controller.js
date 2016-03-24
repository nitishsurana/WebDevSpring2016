/**
 * Created by Nitish on 3/10/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location,$routeParams, SearchService){
        //console.log("search controller");
        $scope.search = search;/*
        var sym = $routeParams.symbol;
        if (sym){
            searchResult(sym);
        }
*/      //search();
        function searchResult(s){
            $location.url("/search/" + s);
        }

        function search(){
            console.log($scope.queryText);
           // console.log("search controller");
            SearchService.search($scope.queryType, $scope.queryText)
                .success(function(response){
                    //return response;
                    $scope.returnData= response;
                    console.log($scope.returnData);
                });
            sym = $routeParams.symbol;

            if (sym){
                searchResult(sym);
            }

            function searchResult(s){
                $location.url("/search/" + s);
            }
        }
    }
})();