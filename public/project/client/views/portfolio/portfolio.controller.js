/**
 * Created by Nitish on 3/3/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("PortfolioController",PortfolioController);

    function PortfolioController(PortfolioService, UserService, SearchService){

        var vm = this;

        vm.addInvestment = addInvestment;
        vm.updateInvestment = updateInvestment;
        vm.deleteInvestment = deleteInvestment;
        vm.selectInvestment = selectInvestment;

        var currentUser = UserService.getCurrentUser();
        //console.log(currentUser);
        var currentUserId = currentUser._id;

        function init(){
            PortfolioService.findAllInvestmentByUserId(currentUserId)
                .then(function(response){
                    var portfolio = response.data[0].investment;
                    vm.message = null;
                    vm.portfolio = portfolio;
                    getCurrentValue();
                    vm.invested = PortfolioService.totalInvestmentValue(portfolio);
                    vm.currentValuation = PortfolioService.currentValue(portfolio);
                    vm.netGain = PortfolioService.calculateProfit(portfolio);
                }, function(error){
                    vm.message = "Error in loading portfolio. Please try again later.";
                });
        }
        
        init();

        function getCurrentValue(){
            for (var i=0; i<vm.portfolio.length; i++){
                var a = SearchService.getStockValue("Yahoo");
                console.log(a);
            }
        }
        
        function addInvestment(investment){
            //console.log(investment);
            //console.log(currentUserId);
            investment.totalAmtInvested = investment.qty * investment.pricePerQty;
            PortfolioService.addInvestment(currentUserId,investment)
                .then(function(response){
                    //console.log(response);
                    vm.message = null;
                    //console.log(response.data);
                    init();
                }, function(error){
                    vm.message = "Error in adding Investment. Please try again later.";
                });
        }

        function updateInvestment(investment){
            //console.log(investment);
            investment.totalAmtInvested = investment.qty * investment.pricePerQty;
            PortfolioService.updateInvestment(currentUserId, investment)
                .then(function(response){
                    //console.log(response);
                    vm.message = null;
                    init();
                }, function(error){
                    vm.message = "Error in updating Investment. Please try again later.";
                });
        }

        function deleteInvestment(index){
            console.log(index);
            PortfolioService.deleteInvestment(currentUserId, vm.portfolio[index]._id)
                .then(function(response){
                    //console.log(response);
                    vm.message = null;
                    init();
                }, function(error){
                    vm.message = "Error in deleting Investment. Please try again later.";
                });
        }

        function selectInvestment(index){
            //console.log(vm.portfolio[index]);
            vm.investment = vm.portfolio[index];
        }
    }
})();