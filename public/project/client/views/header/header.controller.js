/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, UserService,SearchService){
        $scope.logout = logout;

        function logout(){
            UserService.setCurrentUser(null);
        }

    }
})();