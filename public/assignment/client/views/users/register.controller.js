/**
 * Created by Nitish on 2/16/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var a = this;
        a.register = register;
        function register(user) {
            $rootScope.newRegistration = {
                "username": user.username,
                "password": user.password,
                "firstName": "",
                "lastName": "",
                "emails": [user.email],
                "phones": []
            };
            console.log($rootScope.newRegistration);
            UserService
                .createUser($rootScope.newRegistration)
                .then(function(response){
                    var ret = response.data;
                    console.log(ret);
                    UserService.setCurrentUser(ret);/*
                    for(var u in ret){
                        console.log(ret[u]);
                        if (ret[u].username == user.username){

                        }
                    }*/
                    $location.url('/profile');
                });

        }
    }
})();