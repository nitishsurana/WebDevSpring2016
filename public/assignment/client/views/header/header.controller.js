/**
 * Created by Nitish on 2/16/2016.
 */
(function (){
angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

function HeaderController($scope, $location, UserService) {

    $scope.logout = logout;
    function logout(){
        //console.log("Log out!");
        UserService.logOut()
            .then(function (response){
                //console.log("Logged out.");
                $location.url("/home");
            }, function(err){
                a.alert("Error in logging out. Please try again.");
            });
    }
}
})();