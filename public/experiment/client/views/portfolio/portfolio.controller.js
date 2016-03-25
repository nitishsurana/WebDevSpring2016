/**
 * Created by Nitish on 3/3/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("PortfolioController",PortfolioController);

    function PortfolioController($scope, PortfolioService, UserService){

        $scope.addInvestment = addInvestment;
        $scope.updateInvestment = updateInvestment;
        $scope.deleteInvestment = deleteInvestment;
        $scope.selectInvestment = selectInvestment;

        var selectedIndex = -1;
        var currentUserId = UserService.getCurrentUser.userId;

        $scope.portfolio = PortfolioService.findAllInvestmentByUserId(currentUserId);
        $scope.model.invested = PortfolioService.totalInvestmentValue(currentUserId);
        $scope.model.currentValuation = PortfolioService.currentValue(currentUserId);
        $scope.model.netGain = PortfolioService.calculateProfit(currentUserId);

        function addInvestment(investment){
            /*var investment = {
                "investmentOption": $scope.investmentOption,
                "pricePerQty": $scope.pricePerQty,
                "qty": $scope.qty,
                "totalInvestment": $scope.totalInvestment,
                "currentValue": $scope.currentValue,
                "profit": $scope.profit
            };*/
            
            var investments = PortfolioService.addInvestment(currentUserId,investment);
            $scope.model.portfolio = investments.data;
            $scope.model.invested = PortfolioService.totalInvestmentValue(currentUserId);
            $scope.model.currentValuation = PortfolioService.currentValue(currentUserId);
            $scope.model.netGain = PortfolioService.calculateProfit(currentUserId);
        }

        function updateInvestment(investment){
            /*var investment = {
                "investmentOption": $scope.investmentOption,
                "pricePerQty": $scope.pricePerQty,
                "qty": $scope.qty,
                "totalInvestment": $scope.totalInvestment,
                "currentValue": $scope.currentValue,
                "profit": $scope.profit
            };*/

            var investments = PortfolioService.updateInvestment(currentUserId, investment);
            $scope.model.portfolio = investments.data;
            $scope.model.invested = PortfolioService.totalInvestmentValue(currentUserId);
            $scope.model.currentValuation = PortfolioService.currentValue(currentUserId);
            $scope.model.netGain = PortfolioService.calculateProfit(currentUserId);
        }

        function deleteInvestment(index){
            var investments = PortfolioService.deleteInvestment(currentUserId, $scope.portfolio[index].investmentOption);
            $scope.model.portfolio = investments.data;
            $scope.model.invested = PortfolioService.totalInvestmentValue(currentUserId);
            $scope.model.currentValuation = PortfolioService.currentValue(currentUserId);
            $scope.model.netGain = PortfolioService.calculateProfit(currentUserId);
        }

        function selectInvestment(index){
            $scope.model.investmentOption = $scope.model.portfolio[index].investmentOption;
            $scope.model.pricePerQty = $scope.model.portfolio[index].pricePerQty;
            $scope.model.qty = $scope.model.portfolio[index].qty;
            $scope.model.totalInvestment = $scope.model.portfolio[index].totalInvestment;
            $scope.model.currentValue = $scope.model.portfolio[index].currentValue;
            $scope.model.profit = $scope.model.portfolio[index].profit;
            selectedIndex = index;
        }

    }
})();