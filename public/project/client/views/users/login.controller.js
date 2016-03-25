/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.login = login;
        function login(loginCredentials) {
            //console.log(loginCredentials);
            UserService.findUserByCredentials(loginCredentials.username, loginCredentials.password)
                .success(function(response){
                    if (response) {
                        //console.log(response);
                        UserService.setCurrentUser(response);
                        $location.url("/portfolio");
                    }
                });
        }

    }
})();