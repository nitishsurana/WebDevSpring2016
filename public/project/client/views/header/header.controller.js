/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, UserService, $location){
        $scope.logout = logout;
        
        function logout(){
            UserService.logOut()
                .then(function(response){
                    $location.url("/home");
                }, function(error){

                });
        }

    }
})();