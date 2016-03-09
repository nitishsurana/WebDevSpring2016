/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("HomeController", HomeController);

    function HomeController($scope,SearchService){
        $scope.search= search;

        function search(){
            SearchService.search($scope.queryType, $scope.queryText);
        }
    }
})();