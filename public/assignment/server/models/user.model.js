/**
 * Created by Nitish on 2/16/2016.
 */
angular
    .module("FormBuilderApp")
    .factory('UserService', UserService);

function UserService($rootScope) {
    "use strict";
    var fakeData = [];
    fakeData = [
        { "_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice", "password":"alice","roles": ["student"] },
        { "_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "roles": ["admin"] },
        { "_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie","password":"charlie", "roles": ["faculty"] },
        { "_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
        { "_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed", "roles": ["student"] }
    ];

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

