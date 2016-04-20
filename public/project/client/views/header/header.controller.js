/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, UserService, $location, $rootScope){
        $scope.logout = logout;

        function init(){
            UserService.getCurrentUser()
                .then(function (response) {
                    if (response.data.length == 1) {
                        $rootScope.currentUser = response.data[0];
                    }
                }, function(error){

                });
        }

        init();

        function logout(){
            UserService.logOut()
                .then(function(response){
                    $location.url("/home");
                }, function(error){

                });
        }

    }
})();