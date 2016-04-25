/**
 * Created by Nitish on 3/3/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("PortfolioController", PortfolioController);

    function PortfolioController(PortfolioService, UserService, $timeout) {

        var vm = this;

        vm.addInvestment = addInvestment;
        vm.updateInvestment = updateInvestment;
        vm.deleteInvestment = deleteInvestment;
        vm.selectInvestment = selectInvestment;

        var currentUserId = '';
        UserService.getCurrentUser()
            .then(function (response) {
                currentUserId = response.data._id;
                init();
            });

        function init() {
            PortfolioService.findAllInvestmentByUserId(currentUserId)
                .then(function (response) {
                    if (response.data.length > 0) {
                        var portfolio = response.data[0].investment;
                        vm.message = null;
                        vm.portfolio = portfolio;
                        getCurrentValueOfStocks();
                        vm.invested = PortfolioService.totalInvestmentValue(portfolio);
                    }
                }, function (error) {
                    vm.message = "Error in loading portfolio. Please try again later.";
                });
        }

        function getCurrentValueOfStocks() {
            var a = PortfolioService.currentValueOfStocks(vm.portfolio);
            $timeout(1000)
                .then(function (response) {
                    if (a.$$state.status != 0) {
                        var currentValues = a.$$state.value;
                        for (var i = 0; i < currentValues.length; i++) {
                            vm.portfolio[currentValues[i].position].currentValueOfInvestment = currentValues[i].value;
                            vm.portfolio[currentValues[i].position].profit = vm.portfolio[currentValues[i].position].currentValueOfInvestment - vm.portfolio[currentValues[i].position].totalAmtInvested;
                            if (vm.portfolio[currentValues[i].position].profit >= 0) {
                                vm.portfolio[currentValues[i].position].positive = true;
                            } else {
                                vm.portfolio[currentValues[i].position].positive = false;
                            }
                        }
                        vm.currentValuation = PortfolioService.currentValue(vm.portfolio);
                        vm.netGain = PortfolioService.calculateProfit(vm.portfolio);
                        if (vm.netGain < 0) {
                            vm.overallProfit = false;
                        }
                        else {
                            vm.overallProfit = true;
                        }
                    }
                    else {
                        vm.currentValuation = 0;
                        vm.netGain = 0;
                    }
                });
        }

        function addInvestment(investment) {
            investment.totalAmtInvested = investment.qty * investment.pricePerQty;
            PortfolioService.addInvestment(currentUserId, investment)
                .then(function (response) {
                    vm.message = null;
                    init();
                }, function (error) {
                    vm.message = "Error in adding Investment. Please try again later.";
                });
        }

        function updateInvestment(investment) {
            investment.totalAmtInvested = investment.qty * investment.pricePerQty;
            PortfolioService.updateInvestment(currentUserId, investment)
                .then(function (response) {
                    vm.message = null;
                    init();
                }, function (error) {
                    vm.message = "Error in updating Investment. Please try again later.";
                });
        }

        function deleteInvestment(index) {
            PortfolioService.deleteInvestment(currentUserId, vm.portfolio[index]._id)
                .then(function (response) {
                    vm.message = null;
                    init();
                }, function (error) {
                    vm.message = "Error in deleting Investment. Please try again later.";
                });
        }

        function selectInvestment(index) {
            vm.investment = vm.portfolio[index];
        }
    }
})();