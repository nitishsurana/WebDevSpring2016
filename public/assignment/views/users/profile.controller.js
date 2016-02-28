/**
 * Created by Nitish on 2/17/2016.
 */
angular
    .module('FormBuilderApp')
    .controller('ProfileController',ProfileController);

function ProfileController($scope, $rootScope,UserService) {
    $scope.update = function () {
        var user = $rootScope.user;
        $scope.username = user['username'];
        $scope.pwd = user['password'];
        $scope.email1 = user['email'];
        UserService.updateUser(user);
    };
}