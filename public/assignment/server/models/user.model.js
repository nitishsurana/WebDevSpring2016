/**
 * Created by Nitish on 2/16/2016.
 */

var fakeData = require("./user.mock.json");

module.exports = function () {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername
    };

    return api;

    function findUserById(id){
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i]._id == id){
                return fakeData[i];
            }
        }
        return null;
    }

    function findUserByUsername(username){
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username){
                return fakeData[i];
            }
        }
        return null;
    }


    function findUserByCredentials(username, password) {
        console.log("User model");
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username && fakeData[i].password == password){
                return(fakeData[i]);
            }
        }
        return(null);
    }

    function findAllUsers() {
        return fakeData;
    }

    function createUser (user) {
        var temp = {
            "_id": (new Date()).getTime(),
            "firstName": user.firstName,
            "lastName":  user.lastName,
            "username": user.username,
            "password": user.password
        };
        console.log("Create User - server");
        console.log(temp);
        fakeData.push(temp);
        return user;
    }

    function deleteUserById(id) {
        fakeData = fakeData.filter(function (user) {
            return user._id !== id;
        });
        return fakeData;
    }

    function setCurrentUser(user){
        $rootScope.currentUser = user;
    }
    function getCurrentUser(){
        return $rootScope.currentUser;
    }
    function updateUser(id, user) {
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i]._id === id) {
                fakeData[i] = user;
            }
        }
        return fakeData;
    }
}

