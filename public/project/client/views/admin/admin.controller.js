/**
 * Created by Nitish on 3/4/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("AdminController", AdminController);

    function AdminController(UserService){

        var vm = this;

        vm.addUser= addUser;
        vm.updateUser= updateUser;
        vm.deleteUser= deleteUser;
        vm.selectUser= selectUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;

        function init(){
            UserService.findAllUsers()
                .success(function(response){
                    vm.users = response;
                    //console.log(response);
                });
        }

        init();

        function addUser(user){
            var new_user = {
                "_id": "",
                "fullName": user.fullName,
                "email": "",
                "username": user.username,
                "password": "",
                "phoneNumber": 0,
                "aboutMe": "",
                "interestedInvestments": "",
                "roles": [user.roles]
            };
            UserService.createUser(new_user)
                .success(function(response){
                    console.log(response);
                    vm.users.push(response);
                })
                .error(function (response){

                });
            }

        function roles(roles){
            if (roles.indexOf(",")> 0){
                return roles.split(",");
            }
            else{
                return [roles];
            }
        }

        function updateUser(user){
            user.roles = roles(user.roles);
            UserService.updateUser(user._id, user)
                .success(function (response){

                });
        }

        function deleteUser(index){
            //console.log(vm.users[index]._id);
            UserService.deleteUserById(vm.users[index]._id)
                .success(function(response){
                    vm.users = response;
                    console.log(vm.users);
                });
        }

        function selectUser(index){
            console.log(vm.users[index]);
            vm.user = vm.users[index];
            /*
            vm.user.fullName = vm.users[index].fullName;
            vm.user.username = vm.users[index].username;
            vm.user.roles = vm.users[index].roles;*/
        }
    }
}) ();