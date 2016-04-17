/**
 * Created by Nitish on 3/8/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("DetailsController", DetailsController);

    function DetailsController($rootScope, $routeParams, SearchService, UserService) {
        var vm = this;
        var symbol = $routeParams.symbol;
        var username = $routeParams.id;
        vm.message = null;
        
        vm.followStock = followStock;
        vm.userFollows = userFollows;
        vm.followInvestor = followInvestor;

        if (symbol) {
            SearchService.searchYahoo(symbol)
                .then(function (response) {
                    vm.returnData = {};
                    vm.returnData.option = response.data.query.results.quote;
                    vm.userFollowsStock = null;
                    vm.usersFollowingStock = [];
                    userFollows(response.data.query.results.quote.symbol);
                    usersFollowingStock(symbol);
                });
        }
        else {
            SearchService.searchInvestorById(username)
                .then(function (response) {
                    vm.returnData = {};
                    vm.userFollowingInvestor = [];
                    vm.userFollowStocks = [];
                    vm.userFollowsInvestor = null;
                    vm.returnData.investor = response.data;
                    userFollowInvestor(username);
                    userFollowingStocks(username);
                    usersFollowingInvestor(username);
                });
        }

        function followStock(symbol, name) {
            var stock = {
                name: name,
                symbol: symbol
            };
            if ($rootScope.currentUser) {
                UserService.followStock($rootScope.currentUser._id, stock)
                    .then(function (response) {
                        if (vm.userFollowsStock) {
                            vm.userFollowsStock = false;
                        } else {
                            vm.userFollowsStock = true;
                        }
                        usersFollowingStock(symbol);
                    }, function (error) {
                        console.log(error);
                    });
            }
            else {
                vm.message = "Please login to follow";
            }
        }

        function userFollows(symbol) {
            if ($rootScope.currentUser) {
                UserService.checkIfUserFollowStock($rootScope.currentUser._id, symbol)
                    .then(function (response) {
                        if (response.data == true) {
                            vm.userFollowsStock = true;
                        }
                    }, function (error) {
                        console.log(error);
                    });
            }
        }

        function usersFollowingStock(symbol) {
            vm.usersFollowingStock = [];
            UserService.findAllUsers()
                .then(function (response) {
                    var users = response.data;
                    for (var i = 0; i < users.length; i++) {
                        for (var j = 0; j < users[i].followStocks.length; j++) {
                            if (users[i].followStocks[j].symbol == symbol) {
                                vm.usersFollowingStock.push(users[i]);
                            }
                        }
                    }
                }, function (error) {

                });
        }

        function followInvestor(username, fullName) {
            var investor = {
                username: username,
                fullName: fullName
            };
            if ($rootScope.currentUser) {
                UserService.followInvestor($rootScope.currentUser._id, investor)
                    .then(function (response) {
                        if (vm.userFollowsInvestor) {
                            vm.userFollowsInvestor = false;
                        } else {
                            vm.userFollowsInvestor = true;
                        }
                        usersFollowingInvestor(username);
                        userFollowingStocks();
                    }, function (error) {
                        console.log(error);
                    });
            }
            else {
                vm.message = "Please login to follow";
            }
        }

        function usersFollowingInvestor(username) {
            vm.userFollowingInvestor = [];
            UserService.findAllUsers()
                .then(function (response) {
                    var users = response.data;
                    for (var i = 0; i < users.length; i++) {
                        for (var j = 0; j < users[i].followUsers.length; j++) {
                            if (users[i].followUsers[j].username == username) {
                                vm.userFollowingInvestor.push(users[i]);
                            }
                        }
                    }
                }, function (error) {

                });
        }

        function userFollowInvestor(username) {
            if ($rootScope.currentUser) {
                UserService.checkIfUserFollowInvestor($rootScope.currentUser._id, username)
                    .then(function (response) {
                        if (response.data == true) {
                            vm.userFollowsInvestor = true;
                        }
                    }, function (error) {
                        console.log(error);
                    });
            }
        }

        function userFollowingStocks() {
            if ($rootScope.currentUser) {
                vm.userFollowStocks = $rootScope.currentUser.followStocks;
            }
        }
    }
})();