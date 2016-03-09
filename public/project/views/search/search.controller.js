/**
 * Created by Nitish on 3/8/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("SearchController", SearchController);

    function SearchController($scope, SearchService){
            result = SearchService.returnData;
            console.log(result);
            if (result.name == ""){
                $scope.name = "Oops, incorrect symbol entered. Please enter the correct symbol.";
            }
            else{
                console.log(result);
                $scope.name = "Company Name: " + result.name;
                $scope.ltp = "Last Traded Price: " + result.ltp;
                $scope.symbol = "Company Symbol: " + result.symbol;
            }
        }
}) ();