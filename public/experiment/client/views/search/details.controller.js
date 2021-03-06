/**
 * Created by Nitish on 3/8/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $routeParams, SearchService) {
        var vm = this;
        var symbol = $routeParams.symbol;
        var username = $routeParams.id;
        //console.log(symbol, id);
        if (symbol){
            SearchService.searchYahoo(symbol)
                .then(function (response){
                    vm.returnData = {};
                    vm.returnData.option = response.data.query.results.quote;
                    //console.log(response.data.query.results.quote);
                });
        }
        else{
            console.log("username");
            SearchService.searchInvestorById(username)
                .then(function(response){
                    vm.returnData = {};
                    vm.returnData.investor = response.data;
                    console.log(response.data);
                });
        }
        
        if ($rootScope.returnData.resultType == "Investor"){
            if ($rootScope.returnData.name == ""){
                $scope.name = "Oops!!";
                $scope.symbol = "The investor '" + $rootScope.returnData.query +"' you are searching does not exist." +
                                " Please enter a correct username or full name of the investor."
            }
            else{
                $scope.name = $rootScope.returnData.fullName;
                $scope.about = "About Me: " + $rootScope.returnData.aboutMe;
                $scope.interest = "Interested Investments: " + $rootScope.returnData.interestedInvestments;
                //console.log($rootScope.returnData);
            }
        }
        if ($rootScope.returnData.resultType == "YQL"){
            if ($rootScope.returnData.name == "" || $rootScope.returnData.name == null ) {
                $scope.name = "Oops!!";
                $scope.symbol = "'"+ $rootScope.returnData.query + "' is an incorrect symbol. Please enter the correct symbol.";
            }
            else {
                $scope.name = "Company Name: " + $rootScope.returnData.name;
                $scope.ltp = "Last Traded Price: " + $rootScope.returnData.ltp;
                $scope.symbol = "Company Symbol: " + $rootScope.returnData.symbol;
            }
        }
    }
})();