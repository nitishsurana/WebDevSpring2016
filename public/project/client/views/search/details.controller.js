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

        vm.followStock = followStock;
        vm.userFollows = userFollows;
        vm.followInvestor = followInvestor;

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
                });
        }
        else {
            SearchService.searchInvestorById(username)
                .then(function (response) {
                    vm.returnData = {};
                    vm.userFollowingInvestor = [];
                    vm.userFollowStocks = [];
                    vm.message = null;
                    vm.followUser = null;
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
            else {
                vm.message = "Please login to follow";
            }
        }

        function userFollows(symbol) {
            if ($rootScope.currentUser) {
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

        function usersFollowingStock(symbol) {
            vm.userFollowing = [];
            UserService.findAllUsers()
                .then(function (response) {
                    var users = response.data;
                    for (var i = 0; i < users.length; i++) {
                        for (var j = 0; j < users[i].followStocks.length; j++) {
                            if (users[i].followStocks[j].symbol == symbol) {
                                vm.userFollowing.push(users[i]);
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
                        if (vm.followUser) {
                            vm.followUser = false;
                        } else {
                            vm.followUser = true;
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
                            vm.followUser = true;
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