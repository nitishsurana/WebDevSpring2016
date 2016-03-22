/**
 * Created by Nitish on 3/3/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("PortfolioController",PortfolioController);

    function PortfolioController($scope, PortfolioService){
        $scope.addInvestment = addInvestment;
        $scope.updateInvestment = updateInvestment;
        $scope.deleteInvestment = deleteInvestment;
        $scope.selectInvestment = selectInvestment;
        $scope.invested = PortfolioService.totalInvestmentValue();
        $scope.currentValuation = PortfolioService.currentValue();
        $scope.netGain = PortfolioService.calculateProfit();
        $scope.portfolio = PortfolioService.portfolio;
        var selectedIndex = -1;


        function addInvestment(){
            var investment = {
                "investmentOption": $scope.investmentOption,
                "pricePerQty": $scope.pricePerQty,
                "qty": $scope.qty,
                "totalInvestment": $scope.totalInvestment,
                "currentValue": $scope.currentValue,
                "profit": $scope.profit
            };
            PortfolioService.addInvestment(investment,function(response){
                console.log(response);
                console.log(investment);
                $scope.invested = PortfolioService.totalInvestmentValue();
                $scope.currentValuation = PortfolioService.currentValue();
                $scope.netGain = PortfolioService.calculateProfit();
            });
        }

        function updateInvestment(){
            var investment = {
                "investmentOption": $scope.investmentOption,
                "pricePerQty": $scope.pricePerQty,
                "qty": $scope.qty,
                "totalInvestment": $scope.totalInvestment,
                "currentValue": $scope.currentValue,
                "profit": $scope.profit
            };
            PortfolioService.updateInvestment(investment, function(response){
                $scope.invested = PortfolioService.totalInvestmentValue();
                $scope.currentValuation = PortfolioService.currentValue();
                $scope.netGain = PortfolioService.calculateProfit();
            });
        }

        function deleteInvestment(index){
            PortfolioService.deleteInvestment($scope.portfolio[index].investmentOption,function(response){
                $scope.invested = PortfolioService.totalInvestmentValue();
                $scope.currentValuation = PortfolioService.currentValue();
                $scope.netGain = PortfolioService.calculateProfit();
            });
        }

        function selectInvestment(index){
            $scope.investmentOption = $scope.portfolio[index].investmentOption;
            $scope.pricePerQty = $scope.portfolio[index].pricePerQty;
            $scope.qty = $scope.portfolio[index].qty;
            $scope.totalInvestment = $scope.portfolio[index].totalInvestment;
            $scope.currentValue = $scope.portfolio[index].currentValue;
            $scope.profit = $scope.portfolio[index].profit;
            selectedIndex = index;
        }

    }
})();