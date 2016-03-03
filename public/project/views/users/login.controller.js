/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.login = login;
        function login() {
            UserService.findUserByCredentials($scope.username, $scope.password, function (response) {
                if (response) {
                    UserService.setCurrentUser(response);
                    $location.url("/portfolio");
                }
            });
        }

    }
})();