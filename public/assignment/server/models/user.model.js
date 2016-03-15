/**
 * Created by Nitish on 3/15/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .factory('UserService', UserService);

    function UserService($rootScope) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return api;

        function findUserByUsername(username){
            for(var i=0; i<fakeData.length; i++){
                if (fakeData[i].username == username){
                    return fakeData[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var i=0; i<fakeData.length; i++){
                if (fakeData[i].username == username && fakeData[i].password == password){
                    return fakeData[i];
                }
            }
            return null;
        }

        function findAllUsers(callback) {
            callback(fakeData);
        }

        function createUser (user, callback) {
            var temp = {
                "_id": (new Date()).getTime(),
                "firstName": user.firstName,
                "lastName":  user.lastName,
                "username": user.username,
                "password": user.password
            };
            fakeData.push(temp);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            fakeData = fakeData.filter(function (user) {
                return user.username !== userId;
            });
            callback(fakeData);
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
        function getCurrentUser(){
            return $rootScope.currentUser;
        }
        function updateUser(userId, user, callback) {
            for (var i = 0; i < fakeData.length; i++) {
                if (fakeData[i].username === userId) {
                    fakeData[i] = user;
                }
            }
            callback(fakeData);
        }
    }
})();