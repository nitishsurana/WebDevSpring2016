/**
 * Created by Nitish on 2/16/2016.
 */
angular
    .module("FormBuilderApp")
    .factory('UserService', UserService);

function UserService() {
    "use strict";
    var fakeData = [];
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    }

    fakeData = [
        {"_id": 123, "firstName": "Alice", "lastName": "Wonderland", "username": "alice", "password": "alice"},
        {"_id": 234, "firstName": "Bob", "lastName": "Hope", "username": "bob", "password": "bob"},
        {"_id": 345, "firstName": "Charlie", "lastName": "Brown", "username": "charlie", "password": "charlie"},
        {"_id": 456, "firstName": "Dan", "lastName": "Craig", "username": "dan", "password": "dan"},
        {"_id": 567, "firstName": "Edward", "lastName": "Norton", "username": "ed", "password": "ed"}
    ];

    function findUserByCredentials(username, password, callback) {
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username && fakeData[i].password == password){
                callback(fakeData[i]);
            }
        }
        callback(null);
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

    function updateUser(userId, user, callback) {
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].username === userId) {
                fakeData[i] = user;
            }
        }
        callback(fakeData);
    }
    return api;
}

