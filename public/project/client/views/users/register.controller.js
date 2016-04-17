/**
 * Created by Nitish on 3/2/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            UserService.createUser(user)
                .then(function (response) {
                    vm.user = response.data;
                    UserService.setCurrentUser(response);
                    $location.url("/profile");
                }, function (error) {
                    alert("Unable to Register. Please try again.");
                    console.log(error);
                });
        }
    }
})();