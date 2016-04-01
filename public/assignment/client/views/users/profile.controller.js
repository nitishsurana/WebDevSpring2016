/**
 * Created by Nitish on 2/17/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller('ProfileController',ProfileController);

    function ProfileController($rootScope,UserService) {
        var a = this;

        a.update = update;
        console.log($rootScope.currentUser);
        if ($rootScope.currentUser){
            a.user = $rootScope.currentUser;
        }
        else{
            a.user= $rootScope.newRegistration;
            console.log($rootScope.newRegistration);
        }
        console.log(a.user);
        function update(user) {
            console.log(user);
            user.emails = stringToArray(user.emails);
            user.phones = stringToArray(user.phones);
            console.log(user);
            UserService
                .updateUser(user._id,$rootScope.currentUser)
                .then(function (response) {
                    var result = response.data;
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        if (result[i]._id == user._id) {
                            UserService.setCurrentUser(result[i]);
                        }
                    }

                });
        }

        function stringToArray(text){
            var array = [];
            if (text.indexOf(",")> 0){
                array = text.split(",");
            }
            else{
                array = [text];
            }
            return array;
        }
    }
})();