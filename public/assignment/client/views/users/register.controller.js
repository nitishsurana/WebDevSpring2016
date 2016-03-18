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
                "email": user.email
            };
            console.log($rootScope.newRegistration);
            UserService
                .createUser($rootScope.newRegistration)
                .then(function(response){
                    var ret = response.data;
                    //console.log(ret);
                    for(var u in ret){
                        //console.log(ret[u]);
                        if (ret[u].username == user.username){
                            UserService.setCurrentUser(ret[u]);
                        }
                    }
                    $location.url('/profile');
                });

        }
    }
})();