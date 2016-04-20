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
        vm.dataLoaded = false;
        vm.followStock = followStock;
        vm.userFollows = userFollows;
        vm.followInvestor = followInvestor;

        if (symbol) {
            SearchService.searchYahoo(symbol)
                .then(function (response) {
                    console.log(response);
                    if (response.data.length == 2 && response.data[1].query.results != null) {
                        var a = response.data[1].query.results.quote;
                        //console.log();
                        vm.returnData = {};
                        vm.returnData.option = response.data[0].query.results.quote;
                        vm.tableData = {
                            "Day's Range": vm.returnData.option.DaysRange,
                            "Market Capitalization": vm.returnData.option.MarketCapitalization,
                            "Year Low": vm.returnData.option.YearLow,
                            "Year High": vm.returnData.option.YearHigh
                        };
                        console.log(vm.returnData.option);
                        var prices = [];
                        var dates = [];
                        for (var i = 0; i < a.length; i++) {
                            dates.push(a[i].Date);
                            prices.push(parseInt(a[i].Close));
                        }
                        if (vm.returnData.option.Change < 0) {
                            vm.negative = true;
                            vm.positive = false;
                        } else if (vm.returnData.option.Change > 0) {
                            vm.negative = false;
                            vm.positive = true;
                        }
                        //console.log(dates);
                        //console.log(prices);
                        Highcharts.chart('chartSpace', {
                            chart: {
                                zoomType: 'x'
                            },
                            title: {
                                text: null
                            },
                            legend: {
                                enabled: false
                            },
                            xAxis: {
                                title: {
                                    text: 'Dates'
                                },
                                type: 'datetime',
                                categories: dates.reverse()
                            },
                            yAxis: {
                                range: 100,
                                title: {
                                    text: 'Stock Price'
                                }
                            },
                            series: [{
                                type: 'area',
                                name: 'Close Price ',
                                data: prices.reverse(),
                                tooltip: {
                                    valueDecimals: 2
                                }
                            }]
                        });
                        vm.userFollowsStock = null;
                        vm.usersFollowingStock = [];
                        userFollows(response.data[0].query.results.quote.symbol);
                        usersFollowingStock(symbol);
                        vm.dataLoaded = true;
                    } else {
                        vm.dataLoaded = true;
                        vm.error = "Sorry! Requested Data is unavailable. Please check if the company is still traded.";
                    }
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
                    vm.dataLoaded = true;
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
                        userFollowingStocks(username);
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

        function userFollowingStocks(username) {
            if ($rootScope.currentUser) {
                UserService.stocksFollowedByUser(username)
                    .then(function(response){
                        vm.userFollowStocks = response.data[0].followStocks;
                    }, function(error){

                    });
            }
        }
    }
})();