/**
 * Created by Nitish on 3/10/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $rootScope,$routeParams, SearchService){

        $scope.search = search;
        var sym = $routeParams.symbol;

        console.log($rootScope.returnData);
        if (sym){
            searchResult(sym);
        }

        function searchResult(s){
            console.log(s);
            $location.url("/search/" + s);
        }

        function search(){
            SearchService.search($scope.queryType, $scope.queryText);
            $scope.$location.url('/search');

            sym = $routeParams.symbol;

            console.log($rootScope.returnData);
            if (sym){
                searchResult(sym);
            }

            function searchResult(s){
                console.log(s);
                $location.url("/search/" + s);
            }
        }
    }
})();