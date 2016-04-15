/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;/*
        UserService.findAllUsers()
            .success(function(response){
                console.log(response);
            });*/
        function login(loginCredentials) {
            //console.log(loginCredentials);
            if (!loginCredentials.hasOwnProperty("password")){
                //console.log("TRUE");
                loginCredentials.password = "";
            }
            UserService.findUserByCredentials(loginCredentials.username, loginCredentials.password)
                .then(function(response){
                    //console.log(respose.data);
                    UserService.setCurrentUser(response.data);
                    $location.url("/portfolio");
                }, function(error){
                    console.log(error);
                });

        }

    }
})();