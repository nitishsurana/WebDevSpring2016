/**
 * Created by Nitish on 3/2/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(loginCredentials) {
            if (!loginCredentials.hasOwnProperty("password")) {
                loginCredentials.password = "";
            }
            UserService.login(loginCredentials)
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/portfolio");
                    }
                }, function (error) {
                    console.log(error);
                });
        }
    }
})();