/**
 * Created by Nitish on 3/4/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService){
        $scope.addUser= addUser;
        $scope.updateUser= updateUser;
        $scope.deleteUser= deleteUser;
        $scope.selectUser= selectUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.users = UserService.users;
        var selectedIndex = -1;

        function addUser(){
            var user = {
                "fullName": $scope.fullName,
                "email": "",
                "username": $scope.username,
                "password": "",
                "phoneNumber": 0,
                "aboutMe": "",
                "interestedInvestments": "",
                "roles": [$scope.roles]
            };
            UserService.createUser(user,function(response){
                console.log(response);
            })
        }

        function roles(){
            if ($scope.roles.indexOf(",")> 0){
                return $scope.roles.split("'");
            }
            else{
                return [$scope.roles];
            }
        }

        function updateUser(){
            var user = {
                "fullName": $scope.fullName,
                "email": $scope.users[selectedIndex].email,
                "username": $scope.username,
                "password": $scope.users[selectedIndex].password,
                "phoneNumber": $scope.users[selectedIndex].phoneNumber,
                "aboutMe": $scope.users[selectedIndex].aboutMe,
                "interestedInvestments": $scope.users[selectedIndex].interestedInvestments,
                "roles": roles()
            };
            UserService.updateUser($scope.username, user, function (){

            });
        }

        function deleteUser(index){
            UserService.deleteUserById($scope.users[index].username,function(response){
                $scope.users = response;
                console.log($scope.users);
            });
        }

        function selectUser(index){
            $scope.fullName = $scope.users[index].fullName;
            $scope.username = $scope.users[index].username;
            $scope.roles = $scope.users[index].roles;
            selectedIndex = index;
        }
    }
}) ();