/**
 * Created by Nitish on 4/10/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService){
        var a = this;
        
        a.addUser = addUser;
        a.updateUser = updateUser;
        a.selectUser = selectUser;
        a.deleteUser = deleteUser;

        init();

        function init(){
            UserService.findAllUsers()
                .then(function(result){
                    a.users = result.data;
                    //console.log(a.users);
                }, function(error){
                   console.log("Error in loading users.", error);
                });
        }

        function addUser(user){
            //console.log(user);
            user.emails = [];
            UserService.adminCreateUser(user)
                .then(function(result){
                    //console.log(result.data);
                    a.users = result.data;
                }, function(error){
                    console.log(error);
                });
        }
        
        function updateUser(user) {
            
        }
        
        function selectUser(index){
            
        }
        
        function deleteUser(index) {
            
        }
    }
}) ();