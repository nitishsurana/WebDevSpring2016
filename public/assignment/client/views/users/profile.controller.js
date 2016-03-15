/**
 * Created by Nitish on 2/17/2016.
 */
(function (){
angular
    .module("FormBuilderApp")
    .controller('ProfileController',ProfileController);

function ProfileController($scope, $rootScope,UserService) {
    $scope.update = update;
    if ($rootScope.currentUser !== null){
        $scope.username = $rootScope.currentUser.username;
        $scope.pwd = $rootScope.currentUser.password;
        $scope.firstName = $rootScope.currentUser.firstName;
        $scope.lastName = $rootScope.currentUser.lastName;
    }
    else{
        $scope.username = $rootScope.newUser.username;
        $scope.pwd = $rootScope.newUser.password;
    }
    function update() {
        var user = {
            "_id": $scope.username,
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "username": $scope.username,
            "password": $scope.pwd
        };
        UserService.setCurrentUser(user);
        UserService.updateUser(user['username'],$rootScope.currentUser,function(response){

        });
    };
}
})();