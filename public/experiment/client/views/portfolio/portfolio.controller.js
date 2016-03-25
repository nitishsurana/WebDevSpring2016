/**
 * Created by Nitish on 3/3/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("PortfolioController",PortfolioController);

    function PortfolioController(PortfolioService, UserService){

        var vm = this;

        vm.addInvestment = addInvestment;
        vm.updateInvestment = updateInvestment;
        vm.deleteInvestment = deleteInvestment;
        vm.selectInvestment = selectInvestment;

        var currentUser = UserService.getCurrentUser();
        var currentUserId = currentUser._id;

        function init(response){
            vm.portfolio = response;
            vm.invested = PortfolioService.totalInvestmentValue(response);
            vm.currentValuation = PortfolioService.currentValue(response);
            vm.netGain = PortfolioService.calculateProfit(response);
        }
        PortfolioService.findAllInvestmentByUserId(currentUserId)
            .success(function(response){
                //console.log(response);
                init(response);
            });


        function addInvestment(investment){
            PortfolioService.addInvestment(currentUserId,investment)
                .success(function(response){
                    //console.log(response);
                    init(response);
                });
        }

        function updateInvestment(investment){
            console.log(investment);
            PortfolioService.updateInvestment(currentUserId, investment)
                .success(function(response){
                    //console.log(response);
                    init(response);
                });
        }

        function deleteInvestment(index){
            PortfolioService.deleteInvestment(currentUserId, vm.portfolio[index].investmentOption)
                .success(function(response){
                    //console.log(response);
                    init(response);
                });
        }

        function selectInvestment(index){
            //console.log(vm.portfolio[index]);
            vm.investment = vm.portfolio[index];
        }
    }
})();