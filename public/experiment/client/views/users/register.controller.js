/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("RegisterController", RegisterController);

    function RegisterController($location,UserService) {
        var vm = this;
        vm.register = register;
        function register(user) {
            UserService.createUser(user)
                .success(function (response){
                    UserService.setCurrentUser(response);
                    //console.log(response);
                    $location.url("/profile");
                })
                .error(function (response){
                    alert("Unable to Register. Please try again.");
                    console.log(response);
                });
        }
    }
})();