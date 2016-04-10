/**
 * Created by Nitish on 2/16/2016.
 */
(function (){
angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

function HeaderController($location, UserService) {
    var a = this;
    a.logout = logout;
    function logout(){
        UserService.logOut()
            .then(function (response){
                $location.url("/home");
            }, function(err){
                a.alert("Error in logging out. Please try again.");
            });
    }
}
})();