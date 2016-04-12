/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("RegisterController", RegisterController);

    function RegisterController($location,UserService) {
        console.log("Register controller");
        var vm = this;
        vm.register = register;
        function register(user) {
            console.log("Register");
            UserService.createUser(user)
                .then(function (response){
                    vm.user = response.data;
                    UserService.setCurrentUser(response);
                    console.log(response.data);
                    $location.url("/profile");
                }, function (error){
                    alert("Unable to Register. Please try again.");
                    console.log(error);
                });
        }
    }
})();