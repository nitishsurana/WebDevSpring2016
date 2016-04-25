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
        vm.errorMessage = null;

        function register(user) {
            UserService.createUser(user)
                .then(function (response) {
                    vm.user = response.data;
                    $location.url("/login");
                }, function (error) {
                    if(error.status == 401){
                        vm.errorMessage = error.data;
                    } else {
                        alert("Unable to Register. Please try again.");
                    }
                });
        }
    }
})();