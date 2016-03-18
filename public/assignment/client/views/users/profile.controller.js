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
    if ($rootScope.currentUser !== null){
        a.user = $rootScope.currentUser;
    }
    else{
        a.user= $rootScope.newUser;
    }
    function update(user) {
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
    };
}
})();