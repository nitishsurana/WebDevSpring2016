/**
 * Created by Nitish on 2/17/2016.
 */
angular
    .module("FormBuilderApp")
    .controller('ProfileController',ProfileController);

function ProfileController($scope, $rootScope,UserService) {
    $scope.update = update;
    function update() {
        var user = {
            "_id": $scope.username,
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "username": $scope.username,
            "password": $scope.pwd
        };
        $rootScope.newUser = user;
        UserService.updateUser(user['username'],$rootScope.newUser,function(response){
            $rootScope.newUser = response;
        });
    };
}