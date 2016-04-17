/**
 * Created by Nitish on 3/8/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $routeParams, SearchService, UserService) {
        var vm = this;
        var symbol = $routeParams.symbol;
        var username = $routeParams.id;
        //console.log(symbol, id);
        vm.followStock = followStock;
        vm.userFollows = userFollows;
        if (symbol) {
            SearchService.searchYahoo(symbol)
                .then(function (response) {
                    vm.returnData = {};
                    vm.returnData.option = response.data.query.results.quote;
                    vm.follow = null;
                    vm.message = null;
                    vm.userFollowing = [];
                    userFollows(response.data.query.results.quote.symbol);
                    usersFollowingStock(symbol);
                    //console.log(vm.follow);
                    //console.log(response.data.query.results.quote);
                });
        }
        else {
            //console.log("username");
            SearchService.searchInvestorById(username)
                .then(function (response) {
                    vm.returnData = {};
                    vm.returnData.investor = response.data;
                    //console.log(response.data);
                });
        }

        if ($rootScope.returnData.resultType == "Investor") {
            if ($rootScope.returnData.name == "") {
                $scope.name = "Oops!!";
                $scope.symbol = "The investor '" + $rootScope.returnData.query + "' you are searching does not exist." +
                    " Please enter a correct username or full name of the investor."
            }
            else {
                $scope.name = $rootScope.returnData.fullName;
                $scope.about = "About Me: " + $rootScope.returnData.aboutMe;
                $scope.interest = "Interested Investments: " + $rootScope.returnData.interestedInvestments;
                //console.log($rootScope.returnData);
            }
        }
        if ($rootScope.returnData.resultType == "YQL") {
            if ($rootScope.returnData.name == "" || $rootScope.returnData.name == null) {
                $scope.name = "Oops!!";
                $scope.symbol = "'" + $rootScope.returnData.query + "' is an incorrect symbol. Please enter the correct symbol.";
            }
            else {
                $scope.name = "Company Name: " + $rootScope.returnData.name;
                $scope.ltp = "Last Traded Price: " + $rootScope.returnData.ltp;
                $scope.symbol = "Company Symbol: " + $rootScope.returnData.symbol;
            }
        }

        function followStock(symbol, name) {
            var stock = {
                name: name,
                symbol: symbol
            };
            if ($rootScope.currentUser) {
                UserService.followStock($rootScope.currentUser._id, stock)
                    .then(function (response) {
                        //console.log("success: ", response);
                        if (vm.follow) {
                            vm.follow = false;
                        } else {
                            vm.follow = true;
                        }
                        usersFollowingStock(symbol);
                    }, function (error) {
                        console.log(error);
                    });
            }
            else{
                vm.message = "Please login to follow";
            }
        }

        function userFollows(symbol) {
            //console.log(symbol);
            if($rootScope.currentUser) {
                UserService.checkIfUserFollowStock($rootScope.currentUser._id, symbol)
                    .then(function (response) {
                        if (response.data == true) {
                            vm.follow = true;
                        }
                    }, function (error) {
                        console.log(error);
                    });
            }
        }

        function usersFollowingStock(symbol){
            vm.userFollowing = [];
            UserService.findAllUsers()
                .then(function(response){
                    var users = response.data;
                    for(var i=0; i<users.length; i++){
                        for(var j=0; j<users[i].followStocks.length; j++){
                            if (users[i].followStocks[j].symbol == symbol){
                                vm.userFollowing.push(users[i]);
                            }
                        }
                    }
                }, function (error){

                });
        }
    }
})();